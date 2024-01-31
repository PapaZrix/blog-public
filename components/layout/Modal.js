import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useEffect } from 'react';
import { FaHome, FaInfoCircle, FaUser } from 'react-icons/fa';
import { BiLibrary } from 'react-icons/bi';
import { IoSettings } from 'react-icons/io5';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { MdDashboard } from 'react-icons/md';
import { IoMdExit } from 'react-icons/io';
import styles from './Modal.module.css';
import { useNavbarContext } from '../../context/NavbarContext';
import UserAvatar from '../user/UserAvatar';

export default function Modal() {
  const { data: session, status } = useSession();
  const { isOpen, setIsOpen } = useNavbarContext();
  const active = isOpen ? styles.active : '';

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  }, [isOpen]);

  return (
    <>
      <aside className={`${styles.container} ${active}`}>
        <div className={styles.inner}>
          <div className={styles.top}>
            <Link href='/'>
              <p className={styles.logo}>
                Press<span>To</span>Interact
              </p>
            </Link>
            <AiOutlineCloseCircle
              size={'3rem'}
              onClick={() => setIsOpen(!isOpen)}
            />
          </div>
          <nav>
            {status === 'unauthenticated' ? (
              <div className={styles.btns}>
                <div onClick={() => setIsOpen(!isOpen)}>
                  <Link href='/login'>
                    <button className={styles.login}>Respawn</button>
                  </Link>
                </div>
                <div onClick={() => setIsOpen(!isOpen)}>
                  <Link href='/register'>
                    <button className={styles.register}>
                      Create Character
                    </button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className={styles.authenticated}>
                <UserAvatar user={session?.user} className={styles.image} />
                <div className={styles.info}>
                  <p>{session?.user.name}</p>
                  <p>{session?.user.email}</p>
                </div>
              </div>
            )}
            <ul>
              <li onClick={() => setIsOpen(!isOpen)}>
                <Link href='/'>
                  <a className={styles.link}>
                    <FaHome size={'2.5rem'} />
                    <p>Home</p>
                  </a>
                </Link>
              </li>
              {status === 'authenticated' ? (
                session?.user.role === 'ADMIN' ? (
                  <li onClick={() => setIsOpen(!isOpen)}>
                    <Link href={`/admin/posts`}>
                      <a className={styles.link}>
                        <MdDashboard size={'2.5rem'} /> Dashboard
                      </a>
                    </Link>
                  </li>
                ) : (
                  <>
                    <li onClick={() => setIsOpen(!isOpen)}>
                      <Link
                        href={{
                          pathname: `/user/${session?.user.id}`,
                          query: { route: 'profile' },
                        }}
                      >
                        <a className={styles.link}>
                          <FaUser size={'2.5rem'} /> Profile
                        </a>
                      </Link>
                    </li>
                    <li onClick={() => setIsOpen(!isOpen)}>
                      <Link
                        href={{
                          pathname: `/user/${session?.user.id}`,
                          query: { route: 'settings' },
                        }}
                      >
                        <a className={styles.link}>
                          <IoSettings size={'2.5rem'} /> Settings
                        </a>
                      </Link>
                    </li>
                  </>
                )
              ) : null}
              <li onClick={() => setIsOpen(!isOpen)}>
                <Link href='/collections'>
                  <a className={styles.link}>
                    <BiLibrary size={'2.5rem'} />
                    <p>Collections</p>
                  </a>
                </Link>
              </li>
              <li onClick={() => setIsOpen(!isOpen)}>
                <Link href='/about'>
                  <a className={styles.link}>
                    <FaInfoCircle size={'2.5rem'} />
                    <p>Lore</p>
                  </a>
                </Link>
              </li>
              {status === 'authenticated' && (
                <li onClick={() => signOut()}>
                  <IoMdExit size={'2.5rem'} />
                  Exit Game
                </li>
              )}
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
}
