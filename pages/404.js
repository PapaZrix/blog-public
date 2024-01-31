import Image from 'next/image';
import styles from '../styles/404.module.css';
import Link from 'next/link';

export default function Custom404() {
  return (
    <div className={styles.container}>
      <Image src='/images/404.png' alt='404 error' width={300} height={200} />
      <h1>Oops, your game crashed!</h1>
      <p>Make sure your target exists</p>
      <Link href='/'>
        <button className={styles.back}>Back to Hub World</button>
      </Link>
    </div>
  );
}
