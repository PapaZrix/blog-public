import prisma from '../../db';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  try {
    const { email, username, password } = req.body;

    if (!email || !username || !password) return res.status(405).end();

    const userExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userExists) {
      return res.status(400).json('User already exists!');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        username,
        hashedPassword,
      },
    });

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(400).end();
  }
}
