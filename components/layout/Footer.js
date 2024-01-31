import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer({ }) {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <ul>
            <li>
              <Link href='/about'>About Us</Link>
            </li>
            <li>
              <Link href='/collections'>Collections</Link>
            </li>
          </ul>
        </div>
        <hr className={styles.hr}></hr>
        <div className={styles.bottom}>
          <p className={styles.rights}>
            © {new Date().getFullYear()} PressToInteract - All Rights Reserved.
          </p>
          <Link href='/'>
            <p className={styles.logo}>
              Press<span style={{ color: '#0a9e01' }}>To</span>Interact
            </p>
          </Link>
        </div>
      </div>
    </footer>
  );
}
