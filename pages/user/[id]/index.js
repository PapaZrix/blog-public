import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { BiUserVoice } from 'react-icons/bi';
import { IoSettingsOutline } from 'react-icons/io5';
import Loader from '../../../components/layout/Loader';
import UserSidebar from '../../../components/user/UserSidebar';
import styles from '../../../styles/UserPage.module.css';
import UserActivity from '../../../components/user/UserActivity';
import UserSettings from '../../../components/user/UserSettings';
import useUser from '../../../hooks/useUser';
import prisma from '../../../db';

export default function UserPage({ id }) {
  const router = useRouter();
  const { data: user, isLoading, refetch } = useUser(id);
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    setActiveTab(router.query.route ? router.query.route : 'profile');
  }, [router.query, router]);

  useEffect(() => {
    refetch();
  }, [id]);

  if (isLoading)
    return (
      <div className='loading'>
        <Loader />
      </div>
    );

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <UserSidebar user={user} />
        {user.id === session?.user.id ? (
          <div className={styles.right}>
            <div className={styles.filters}>
              <button
                className={
                  styles.profile +
                  ' ' +
                  (activeTab === 'profile' ? styles.active : null)
                }
                onClick={() => setActiveTab('profile')}
              >
                <BiUserVoice className={styles.icon} size={'1.5rem'} />
                Activity
              </button>
              <button
                className={
                  styles.settings +
                  ' ' +
                  (activeTab === 'settings' ? styles.active : null)
                }
                onClick={() => setActiveTab('settings')}
              >
                <IoSettingsOutline className={styles.icon} size={'1.5rem'} />
                Settings
              </button>
            </div>
            {activeTab === 'profile' ? (
              <UserActivity user={user} session={session} />
            ) : (
              <UserSettings user={user} />
            )}
          </div>
        ) : (
          <div className={styles.right}>
            <div className={styles.filters}>
              <h1>User Activity</h1>
            </div>
            <UserActivity user={user} />
          </div>
        )}
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;

  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    return { notFound: true };
  }

  return { props: { id } };
}
