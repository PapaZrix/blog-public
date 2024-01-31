import styles from './Header.module.css';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import Loader from './Loader';
import ProfileDropdown from './ProfileDropdown';
import { useNavbarContext } from '../../context/NavbarContext';
import { IoMdMenu } from 'react-icons/io';

export default function Header({}) {
  const { status } = useSession();
  const { isOpen, setIsOpen } = useNavbarContext();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href='/'>
          <p className={styles.logo}>
            Press<span>To</span>Interact
          </p>
        </Link>
        <IoMdMenu
          className={styles.menu}
          size={'3.5rem'}
          onClick={() => setIsOpen(!isOpen)}
        />
        <nav className={styles.navbar}>
          <ul className={styles.nav}>
            <li>
              <Link href='/collections'>COLLECTIONS</Link>
            </li>
            <li>
              <Link href='/about'>LORE</Link>
            </li>
            {status === 'loading' ? (
              <div className='spinner'>
                <Loader />
              </div>
            ) : status === 'authenticated' ? (
              <ProfileDropdown />
            ) : (
              <li>
                <Link href='/login'>RESPAWN</Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
