import prisma from '../../../../db/index';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]';

export default async function handler(req, res) {
  const { content, postId, replyToId } = req.body;

  const session = await getServerSession(req, res, authOptions);

  if (!session?.user) {
    res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const comment = await prisma.comment.create({
      data: {
        content,
        postId,
        userId: session.user.id,
        replyToId: replyToId || null,
      },
    });

    res.status(200).json({ comment });
  } catch (error) {
    res.status(400).json({
      message: `Something went wrong :/ ${error}`,
    });
  }
}
