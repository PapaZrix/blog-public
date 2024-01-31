import AuthorPage from '../../components/author/AuthorPage';
import prisma from '../../db/index';
import PostCard from '../../components/post/PostCard';
import DATE_OPTIONS from '../../lib/fixDates';
import styles from '../../styles/Author.module.css';

export default function Author({ posts, postCount }) {
  return (
    <div className={styles.author}>
      <AuthorPage author='Fabijan Balen' count={postCount} />
      <div className={styles.container}>
        <div className={styles['header-section']}>
          <h2>POSTS FROM AUTHOR</h2>
        </div>
        <div className={styles.posts}>
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(req) {
  const users = await prisma.user.findMany();

  const author = users.find(
    (user) =>
      user.username.toLowerCase() ===
      req.query.username.replace('-', ' ').toLowerCase()
  );

  if (!author) {
    return { notFound: true };
  }

  const getPosts = await prisma.post.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: { _count: { select: { comments: true } } },
  });

  const postCount = await prisma.post.count();

  const posts = getPosts.map((post) => ({
    ...post,
    createdAt: post.createdAt.toLocaleDateString('en-GB', DATE_OPTIONS),
  }));

  return {
    props: { posts, postCount },
  };
}
