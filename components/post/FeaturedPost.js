import Link from 'next/link';
import styles from './FeaturedPost.module.css';
import Image from 'next/image';
import kebabCase from '../../lib/kebabCase';

export default function FeaturedPost({ post }) {
  return (
    <div style={{ width: '100%' }} className={styles.featured}>
      <Link href={`/${kebabCase(post.title)}#comments`}>
        <a style={{ position: 'relative', display: 'block' }}>
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
      <Link href={`/${post.slug}`}>
        <a style={{ position: 'relative', display: 'block' }}>
          <div className={styles.featuredPost}>
            <Image
              src={post.thumbnail}
              layout='fill'
              objectFit='cover'
              objectPosition='50% 50%'
              priority
              placeholder='blur'
              blurDataURL={post.thumbnail}
              quality={100}
              alt={post.title}
            />
            <h2 className={styles.title}>{post.title}</h2>
            <span className={styles['hover-text']}>{post.title}</span>
          </div>
        </a>
      </Link>
    </div>
  );
}
