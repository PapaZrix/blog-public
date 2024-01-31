import prisma from '../db';
import styles from '../styles/Collections.module.css';
import CollectionCard from '../components/post/CollectionCard';
import { BiLibrary } from 'react-icons/bi';
import Link from 'next/link';

const DATE_OPTIONS = { year: 'numeric', month: 'long', day: 'numeric' };

export default function CollectionPage({ collections }) {
  const empty = collections.length === 0 ? true : false;
  return (
    <div
      className={`${styles.container} ${empty === true ? styles.empty : ''}`}
    >
      {collections.length === 0 ? (
        <div className={styles.fallback}>
          <BiLibrary size={'12.5rem'} />
          <div className={styles.redirect}>
            <h1>No collections yet!</h1>
            <h2>Check back soon</h2>
            <Link href='/'>
              <button className={styles.back}>Back Home</button>
            </Link>
          </div>
        </div>
      ) : (
        collections.map((collection) => (
          <div className={styles.collection} key={collection.id}>
            <CollectionCard collection={collection} />
          </div>
        ))
      )}
    </div>
  );
}

export async function getServerSideProps() {
  const allCollections = await prisma.collection.findMany({
    include: {
      posts: {
        include: { _count: { select: { comments: true } } },
        orderBy: { createdAt: 'asc' },
      },
      user: { select: { username: true, id: true } },
    },
  });

  const collections = allCollections.map((collection) => {
    return {
      ...collection,
      posts: collection.posts.map((post) => ({
        ...post,
        createdAt: post.createdAt.toLocaleDateString('en-US', DATE_OPTIONS),
      })),
    };
  });

  return {
    props: { collections },
  };
}
