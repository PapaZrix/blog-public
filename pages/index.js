import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Loader from '../components/layout/Loader';
import PostCard from '../components/post/PostCard';
import FeaturedPost from '../components/post/FeaturedPost';
import prisma from '../db';
import DATE_OPTIONS from '../lib/fixDates';

export default function Home({ posts }) {
  const featuredPosts = posts.slice(0, 4);
  const otherPosts = posts.slice(4);

  if (!posts) {
    return (
      <div className='loading'>
        <Loader show />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>PressToInteract - Read About Games</title>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta
          name='description'
          content='Weekly posts about our favorite games, sign up and let us know your thoughts!'
        />
        <meta name='keywords' content='read about games, blog' />
        <meta name='robots' content='index, follow' />
        <meta charSet='utf-8' />
        <meta
          property='og:title'
          content='Press To Interact | Read About Games'
        />
        <meta property='og:type' content='website' />
        <meta property='og:url' content='https://presstointeract.com' />
        <meta
          property='og:description'
          content='Weekly posts about our favorite games, sign up and let us know your thoughts!'
        />
        <meta
          property='og:image'
          content='https://utfs.io/f/15b31f4d-da6f-4720-a685-5d80e9aa0147-1zbfv.jpg'
        />
      </Head>
      <div className={styles.container}>
        <div className={styles.banner}>New Post Every Week</div>
        <div className={styles.featured}>
          {featuredPosts.map((post) => (
            <FeaturedPost key={post.id} post={post} />
          ))}
        </div>
        {otherPosts.length === 0 ? null : (
          <div className={styles['other-posts']}>
            <div className={styles['heading-section']}>
              <h2>REMAINING INVENTORY</h2>
            </div>
            <div className={styles.other}>
              {otherPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const getPosts = await prisma.post.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: { _count: { select: { comments: true } } },
  });

  const posts = getPosts.map((post) => ({
    ...post,
    createdAt: post.createdAt.toLocaleDateString('en-us', DATE_OPTIONS),
  }));

  return {
    props: { posts },
  };
}
