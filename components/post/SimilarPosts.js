import Image from 'next/image';
import styles from './SimilarPosts.module.css';
import Loader from '../layout/Loader';
import Link from 'next/link';

export default function SimilarPosts({ posts }) {
  if (!posts) {
    return <Loader show />;
  }

  return (
    <div className={styles.container}>
      <div className={styles['heading-section']}>
        <h2>YOU MIGHT ALSO LIKE</h2>
      </div>
      <div className={styles['post-div']}>
        {posts.map((post) => (
          <div key={post.title} className={styles.post}>
            <div className={styles.image} style={{ position: 'relative' }}>
              <Link href={post.slug}>
                <a>
                  <Image
                    src={post.thumbnail}
                    alt={post.title}
                    layout='fill'
                    objectPosition='50% 50%'
                    placeholder='blur'
                    blurDataURL={post.thumbnail}
                  />
                </a>
              </Link>
            </div>
            <div className={styles.title}>
              <Link href={post.slug}>{post.title}</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
