import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import styles from './PostCard.module.css';
import { onDelete } from '../../lib/postActions';
import kebabCase from '../../lib/kebabCase';
import { useRouter } from 'next/router';

const Interweave = dynamic(
  () => import('interweave').then((module) => module.Interweave),
  { ssr: false }
);

export default function PostCard({ post }) {
  const router = useRouter();

  const removePost = () => {
    const title = post.title;
    const postData = { title };
    onDelete(postData);
  };

  return (
    <div className={styles.card}>
      <div className={styles.image}>
        <Link href={`/${post.slug}`}>
          <a>
            <Image
              src={post.thumbnail}
              alt={post.title}
              layout='fill'
              objectPosition='50% 50%'
              priority
              placeholder='blur'
              blurDataURL={post.thumbnail}
            />
          </a>
        </Link>
        <Link href={`/${kebabCase(post.title)}#comments`}>
          <a>
            <div
              className={`${styles.count}`}
              style={{
                background: 'url(/images/tile-tiny.png) -420px -60px no-repeat',
              }}
            >
              <p>{post._count.comments}</p>
            </div>
          </a>
        </Link>
      </div>
      <div className={styles.cardInfo}>
        <Link href={`/${post.slug}`}>
          <h2 style={{ cursor: 'pointer' }}>{post.title}</h2>
        </Link>
        <p className={styles.date} style={{ color: 'gray' }}>
          {post.createdAt}
        </p>
        <div className={styles.excerpt}>
          <Interweave content={post.summary} />
        </div>
        {router.pathname === '/admin/dashboard' ? (
          <div className={styles.buttons}>
            <button className={styles.delete} onClick={removePost}>
              Delete
            </button>
            <Link href={`/${post.slug}/edit`}>
              <button className={styles.edit}>Edit</button>
            </Link>
          </div>
        ) : (
          <div className={styles.continue}>
            <Link href={`/${post.slug}`}>
              <button className={styles.readMore}>Read More</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
