import prisma from '../../../db';
import { format } from 'date-fns';
import { formatTimeToNow } from '../../../lib/formatDate';

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    const query = await prisma.user.findFirst({
      where: {
        id: id,
      },
      select: {
        username: true,
        email: true,
        id: true,
        image: true,
        role: true,
        comments: {
          include: {
            post: { select: { title: true } },
            likes: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
        likes: true,
        about: true,
        locatedAt: true,
        joinedAt: true,
      },
    });

    const fixDates = {
      ...query,
      comments: query.comments.map((comment) => {
        return {
          ...comment,
          createdAt: formatTimeToNow(new Date(comment.createdAt)),
        };
      }),
    };

    const user = {
      ...fixDates,
      joinedAt: format(new Date(query.joinedAt), 'MMMM yyyy'),
    };

    return res.status(200).json(user);
  } catch (error) {
    res.status(400).json({
      message: `Something went wrong :/ ${error}`,
    });
  }
}
