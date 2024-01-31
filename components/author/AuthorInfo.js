import Image from 'next/image';
import styles from './AuthorInfo.module.css';
import Link from 'next/link';
import kebabCase from '../../lib/kebabCase';

export default function AuthorInfo({ author }) {
  return (
    <div className={styles.card}>
      <div className={styles['header-section']}>
        <h2 className={styles.author}>AUTHOR INFO</h2>
      </div>
      <div className={styles.image}>
        <Link href={`/author/${kebabCase(author.username)}`}>
          <a>
            <Image
              src={author.image}
              alt='author photo'
              layout='fill'
              objectFit='cover'
              objectPosition='50% 50%'
              priority
              placeholder='blur'
              blurDataURL={author.image}
            />
          </a>
        </Link>
      </div>
      <div className={styles.info}>
        <Link href={`/author/${kebabCase(author.username)}`}>
          <h2 className={styles.name}>{author.username}</h2>
        </Link>
        <p className={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Lectus
          arcu bibendum at varius vel pharetra. Turpis egestas pretium aenean
          pharetra magna ac. Justo eget magna fermentum iaculis eu non diam
          phasellus. Cras adipiscing enim eu turpis egestas. Tempor nec feugiat
          nisl pretium fusce id velit ut tortor. Auctor elit sed vulputate mi
          sit amet mauris commodo. Sem viverra aliquet eget sit. Sem viverra
          aliquet eget sit. Ut enim blandit volutpat maecenas. Arcu odio ut sem
          nulla pharetra diam sit.
        </p>
      </div>
    </div>
  );
}
