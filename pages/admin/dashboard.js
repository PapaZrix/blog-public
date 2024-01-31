import prisma from '../../db';
import { useState } from 'react';
import Sidebar from '../../components/layout/DashSidebar';
import styles from '../../styles/Dashboard.module.css';
import DATE_OPTIONS from '../../lib/fixDates';
import PostCard from '../../components/post/PostCard';
import CollectionCard from '../../components/post/CollectionCard';
import { getSession } from 'next-auth/react';

export default function Dashboard({ posts, collections }) {
  const [activeTab, setActiveTab] = useState('posts');

  const handleSwitch = (e) => {
    setActiveTab(e.target.id);
  };

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <Sidebar handleSwitch={handleSwitch} activeTab={activeTab} />
      </div>
      <div className={styles.view}>
        <div className={styles.posts}>
          {activeTab === 'posts' &&
            posts?.map((post) => <PostCard post={post} key={post.id} />)}
        </div>
        <div className={styles.collections}>
          {activeTab === 'collections' &&
            collections?.map((collection) => (
              <CollectionCard key={collection.id} collection={collection} />
            ))}
        </div>
      </div>
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

  const getPosts = await prisma.post.findMany({
    where: { collectionId: null },
    orderBy: {
      createdAt: 'desc',
    },
    include: { _count: { select: { comments: true } } },
  });

  const posts = getPosts.map((post) => ({
    ...post,
    createdAt: post.createdAt.toLocaleDateString('en-us', DATE_OPTIONS),
  }));

  const getCollections = await prisma.collection.findMany({
    include: {
      posts: {
        include: { _count: { select: { comments: true } } },
        orderBy: { createdAt: 'asc' },
      },
      user: { select: { username: true } },
    },
  });

  const collections = getCollections.map((collection) => {
    return {
      ...collection,
      posts: collection.posts.map((post) => ({
        ...post,
        createdAt: post.createdAt.toLocaleDateString('en-US', DATE_OPTIONS),
      })),
    };
  });

  return { props: { posts, collections } };
}
