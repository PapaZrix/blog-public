import prisma from '../../../db';
import kebabCase from '../../../lib/kebabCase';

export default async function handler(req, res) {
  const {
    title,
    thumbnail,
    content,
    summary,
    postId,
    userId,
    isCollection,
    isNewCollection,
    name,
    image,
    description,
  } = req.body;

  if (req.method === 'POST') {
    if (!isCollection) {
      try {
        const post = await prisma.post.create({
          data: {
            title: title,
            content: content,
            summary: summary,
            slug: kebabCase(title),
            thumbnail: thumbnail,
            userId: userId,
          },
        });

        res.status(200).json(post);
      } catch (error) {
        res.status(400).json({
          message: `Something went wrong while posting :/ ${error}`,
        });
      }
    } else {
      try {
        if (isNewCollection) {
          const coll = await prisma.collection.create({
            data: { name: name, userId: userId, description, thumbnail: image },
          });

          const post = await prisma.post.create({
            data: {
              title,
              thumbnail,
              content,
              summary,
              slug: kebabCase(title),
              userId,
              collectionId: coll.id,
              part: 1,
            },
          });

          res.status(200).json({ coll, post });
        } else {
          const collectionPosts = await prisma.collection.findUnique({
            where: { name: name },
            select: { posts: true, id: true },
          });

          const post = await prisma.post.create({
            data: {
              title,
              thumbnail,
              content,
              summary,
              slug: kebabCase(title),
              userId,
              collectionId: collectionPosts.id,
              part: collectionPosts.posts.length + 1,
            },
          });

          const updatedCollection = await prisma.collection.update({
            where: { name: name },
            data: { posts: collectionPosts.posts.concat[post] },
          });

          res.status(200).json({ post, updatedCollection });
        }
      } catch (error) {
        res.status(400).json({
          message: `Something went wrong while posting :/ ${error}`,
        });
      }
    }
  } else if (req.method === 'PUT') {
    const slug = kebabCase(title);

    if (!isCollection) {
      try {
        const post = await prisma.post.update({
          where: {
            id: postId,
          },
          data: {
            title: title,
            thumbnail: thumbnail,
            content: content,
            summary,
            slug: slug,
            userId,
          },
        });
        res.status(200).json(post);
      } catch (error) {
        res.status(400).json({
          message: `Something went wrong while updating :/ ${error}`,
        });
      }
    } else {
      try {
        if (isNewCollection) {
          const coll = await prisma.collection.create({
            data: { name: name, userId: userId, description, thumbnail: image },
          });

          const post = await prisma.post.update({
            where: { id: postId },
            data: {
              title,
              thumbnail,
              content,
              summary,
              slug: kebabCase(title),
              userId,
              collectionId: coll.id,
              part: 1,
            },
          });

          res.status(200).json({ coll, post });
        } else {
          const collectionPosts = await prisma.collection.findUnique({
            where: { name: name },
            select: { posts: true, id: true },
          });

          const post = await prisma.post.update({
            where: { id: postId },
            data: {
              title,
              thumbnail,
              content,
              summary,
              slug: kebabCase(title),
              userId,
              collectionId: collectionPosts.id,
              part: collectionPosts.posts.length + 1,
            },
          });

          const updatedCollection = await prisma.collection.update({
            where: { name: name },
            data: { posts: collectionPosts.posts.concat[post] },
          });

          res.status(200).json({ post, updatedCollection });
        }
      } catch (error) {
        res.status(400).json({
          message: `Something went wrong while posting :/ ${error}`,
        });
      }
    }
  } else {
    try {
      const findPost = await prisma.post.findFirst({
        where: {
          title: title,
        },
      });

      const post = await prisma.post.delete({
        where: {
          id: findPost.id,
        },
      });

      res.status(200).json(post);
    } catch (error) {
      res.status(400).json({
        message: `Something went wrong while deleting :/ ${error}`,
      });
    }
  }
}
