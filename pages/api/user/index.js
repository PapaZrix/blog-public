import prisma from '../../../db';

export default async function handler(req, res) {
  if (req.method === 'PATCH') {
    const { username, about, location, image, id } = req.body;

    try {
      const user = await prisma.user.update({
        where: {
          id,
        },
        data: {
          username,
          about,
          locatedAt: location,
          image,
        },
      });

      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({
        message: `Something went wrong :/ ${error}`,
      });
    }
  }
}
