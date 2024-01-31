import prisma from '../../../db';

export default async function handler(req, res) {
  const { name, thumbnail, description, id } = req.body;

  if (req.method === 'PUT') {
    try {
      const collection = await prisma.collection.update({
        where: { id },
        data: {
          name,
          thumbnail,
          description,
        },
      });

      res.status(200).json(collection);
    } catch (error) {
      res.status(400).json({
        message: `Something went wrong while updating :/ ${error}`,
      });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const collection = await prisma.collection.delete({ where: { id } });

      res.status(200).json(collection);
    } catch (error) {
      res.status(400).json({
        message: `Something went wrong while deleting :/ ${error}`,
      });
    }
  }
}
