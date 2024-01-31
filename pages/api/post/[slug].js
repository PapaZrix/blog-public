import prisma from '../../../db/index';

async function fetchCommentsRecursively(commentId) {
  const comment = await prisma.comment.findUnique({
    where: { id: commentId },
    include: {
      replies: true,
      likes: true,
      User: { select: { username: true, image: true, role: true } },
    },
  });

  if (!comment) return null;

  const replies = await Promise.all(
    comment.replies.map(async (reply) => {
      const nestedReplies = await fetchCommentsRecursively(reply.id);
      return nestedReplies;
    })
  );

  return { ...comment, replies };
}

export default async function handler(req, res) {
  const { slug } = req.query;

  try {
    const post = await prisma.post.findFirst({
      where: { slug },
      include: {
        user: { select: { username: true, image: true } },
        collection: { include: { posts: { orderBy: { part: 'asc' } } } },
      },
    });

    const topLevelComments = await prisma.comment.findMany({
      where: {
        postId: post.id,
        replyToId: null,
      },
    });

    const comments = await Promise.all(
      topLevelComments.map(async (comment) => {
        const commentWithReplies = await fetchCommentsRecursively(comment.id);
        return commentWithReplies;
      })
    );

    const posts = await prisma.post.findMany({
      where: { NOT: { slug } },
      take: 3,
      orderBy: { createdAt: 'desc' },
      select: { id: true, title: true, thumbnail: true, slug: true },
    });

    return res.json({ post, posts, comments });
  } catch (error) {
    res.status(400).json({
      message: `Something went wrong : / ${error}`,
    });
  }
}
