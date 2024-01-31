import NextAuth from 'next-auth/next';
import Credentials from 'next-auth/providers/credentials';
import prisma from '../../../db/index';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import bcrypt from 'bcrypt';

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  providers: [
    Credentials({
      type: 'credentials',
      credentials: {},
      async authorize(credentials) {
        if (!credentials.email || !credentials.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) return null;

        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!passwordMatch) return null;

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, session, trigger }) {
      if (trigger === 'update' && (session?.name || session?.image)) {
        token.name = session.username;
        token.image = session.image;
      }

      if (user) {
        return {
          ...token,
          id: user.id,
          role: user.role,
          image: user.image,
          name: user.username,
        };
      }

      return token;
    },
    async session({ session, token, user }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          role: token.role,
          name: token.name,
          image: token.image,
        },
      };
    },
  },
  pages: {
    signIn: '/login',
  },
};

export default NextAuth(authOptions);
