import { useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { BsChevronDown } from 'react-icons/bs';
import styles from './ProfileDropdown.module.css';
import UserAvatar from '../user/UserAvatar';
import Loader from './Loader';
import Link from 'next/link';
import useOnClickOutside from '../../hooks/useOnClickOutside';

export default function ProfileDropdown({}) {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const handleClickOutside = () => {
    setIsOpen(false);
  };

  const ref = useOnClickOutside(handleClickOutside);

  return (
    <div
      ref={ref}
      className={styles.wrapper}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className={styles.container}>
        {session?.user ? (
          <UserAvatar user={session?.user} className={styles.image} />
        ) : (
          <Loader />
        )}
        <BsChevronDown
          className={styles.chevron}
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0)' }}
        />
      </div>
      {isOpen ? (
        session?.user.role === 'ADMIN' ? (
          <div className={styles.dropdown}>
            <div className={styles.top}>My Account</div>
            <Link href='/admin/new'>
              <a className={`${styles.link} ${styles.row}`}>New Post</a>
            </Link>
            <Link href='/admin/dashboard'>
              <a className={`${styles.link} ${styles.row}`}>Dashboard</a>
            </Link>
            <div className={styles.row} onClick={() => signOut()}>
              Exit Game
            </div>
          </div>
        ) : (
          <div className={styles.dropdown}>
            <div className={styles.top}>My Account</div>
            <Link
              href={{
                pathname: `/user/${session?.user.id}`,
                query: { route: 'profile' },
              }}
            >
              <a className={`${styles.link} ${styles.row}`}>Profile</a>
            </Link>
            <Link
              href={{
                pathname: `/user/${session?.user.id}`,
                query: { route: 'settings' },
              }}
            >
              <a className={`${styles.link} ${styles.row}`}>Settings</a>
            </Link>
            <div className={styles.row} onClick={() => signOut()}>
              Exit Game
            </div>
          </div>
        )
      ) : null}
    </div>
  );
}
