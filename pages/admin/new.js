import { getSession } from 'next-auth/react';
import TextEditor from '../../components/editor/TextEditor';
import prisma from '../../db';

export default function NewPost({ post, session, collections }) {
  return (
    <div className='editor-container'>
      <TextEditor
        post={post}
        userId={session?.user.id}
        collections={collections}
      />
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session || session.user.role !== 'ADMIN') {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const collections = await prisma.collection.findMany();

  return { props: { session, collections } };
}
