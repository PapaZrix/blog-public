import { getServerSession } from 'next-auth';
import prisma from '../db/index';
import { authOptions } from '../pages/api/auth/[...nextauth]';

const serverAuth = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session?.user?.email) throw new Error('Not signed in');

  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    select: {
      username: true,
      email: true,
      id: true,
      image: true,
      role: true,
      joinedAt: true,
      comments: {
        include: {
          post: { select: { title: true } },
          likes: true,
        },
      },
      likes: true,
      about: true,
      locatedAt: true,
    },
  });

  if (!currentUser) throw new Error('User does not exist');

  return { currentUser };
};

export default serverAuth;
