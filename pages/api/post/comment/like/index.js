import prisma from '../../../../../db';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../auth/[...nextauth]';

export default async function handler(req, res) {
  const { commentId } = req.body;

  const session = await getServerSession(req, res, authOptions);

  if (!session?.user.email) throw new Error('Not signed in');

  const currentUser = await prisma.user.findFirst({
    where: {
      email: session.user.email,
    },
  });

  try {
    const existingLike = await prisma.like.findFirst({
      where: {
        userId: currentUser.id,
        commentId,
      },
    });

    if (existingLike) {
      await prisma.like.delete({
        where: {
          userId_commentId: {
            commentId,
            userId: currentUser.id,
          },
        },
      });
      return res.status(200).end();
    }

    await prisma.like.create({
      data: {
        commentId: commentId,
        userId: currentUser.id,
      },
    });

    res.status(200).end();
  } catch (error) {
    res.status(400).json({
      message: `Something went wrong :/ ${error}`,
    });
  }
}
