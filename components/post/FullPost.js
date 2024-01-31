import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';
import styles from './FullPost.module.css';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import kebabCase from '../../lib/kebabCase';
import DATE_OPTIONS from '../../lib/fixDates';

const Interweave = dynamic(
  () => import('interweave').then((module) => module.Interweave),
  { ssr: false }
);

export default function FullPost({ post }) {
  return (
    <>
      {post.collection && post.part !== 1 && (
        <div className={styles.banner}>
          <h3>This Post is Part of a Collection!</h3>
          <Link href={`/${post.collection.posts[0].slug}`}>
            <button>Start from first post</button>
          </Link>
        </div>
      )}
      <div className={styles.post}>
        <div className={styles['post-image']}>
          <Image
            src={post.thumbnail}
            alt={post.title}
            layout='fill'
            objectFit='cover'
            objectPosition='50% 50%'
            priority
            placeholder='blur'
            blurDataURL={post.thumbnail}
          />
        </div>
        <div className={styles['post-content']}>
          <div>
            <h1 className={styles.title}>{post.title}</h1>
          </div>
          <div className={styles['post-info']}>
            <p className={styles.author}>
              Written By{' '}
              <Link href={`/author/${kebabCase(post.user.username)}`}>
                {post.user.username}
              </Link>
            </p>
            <p className={styles.date}>
              <span
                style={{ color: 'rgba(0, 0, 0, 0.44)', margin: '0 0.5rem' }}
              >
                Created
              </span>
              {new Date(post.createdAt).toLocaleDateString(
                'en-us',
                DATE_OPTIONS
              )}
            </p>
          </div>
          <div className={styles.content}>
            <Interweave
              tagName='div'
              className='full-content'
              content={post.content}
            />
          </div>
        </div>
      </div>
      {post.collection && post.collection.posts[post.part] && (
        <div className={styles.next}>
          <Link href={`/${post.collection.posts[post.part].slug}`}>
            <a>
              <h3>Read Next Post in Collection </h3>
              <FaArrowRight size={'1.35rem'} />
            </a>
          </Link>
        </div>
      )}
    </>
  );
}
