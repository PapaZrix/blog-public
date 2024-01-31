import dynamic from 'next/dynamic';
import { getSession } from 'next-auth/react';
import prisma from '../../db';
import Loader from '../../components/layout/Loader';

const TextEditor = dynamic(() => import('../../components/editor/TextEditor'), {
  ssr: false,
});

export default function EditPost({ post, session, collections, postCollIdx }) {
  return { post } ? (
    <div className='editor-container'>
      <TextEditor
        post={post}
        userId={session?.user.id}
        collections={collections}
        postCollIdx={postCollIdx}
      />
    </div>
  ) : (
    <div className='loading'>
      <Loader show />
    </div>
  );
}

export async function getServerSideProps(context) {
  const { slug } = context.query;

  const session = await getSession(context);

  if (!session || session.user.role !== 'ADMIN') {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const collections = await prisma.collection.findMany({
    include: { posts: { select: { slug: true } } }
  });

  const post = await prisma.post.findFirst({
    where: {
      slug: slug,
    },
    select: {
      content: true,
      summary: true,
      id: true,
      slug: true,
      thumbnail: true,
      title: true,
      userId: true,
      collectionId: true
    },
  });

  if (!post) {
    return { notFound: true };
  }

  let postCollIdx = -1

  for (let i = 0; i < collections.length; i++) {
    for (let j = 0; j < collections[i].posts.length; j++) {
      if (collections[i].posts[j].slug === slug) {
        postCollIdx = i
      }
    }
  }

  return {
    props: { post, session, collections, postCollIdx },
  };
}
