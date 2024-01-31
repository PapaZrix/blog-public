import UserAvatar from './UserAvatar';
import styles from './UserSidebar.module.css';
import { SlLocationPin } from 'react-icons/sl';
import { FaRegCalendar } from 'react-icons/fa6';

export default function UserSidebar({ user }) {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <UserAvatar user={user} className={styles.image} />
        <div className={styles.user}>
          <p className={styles.username}>{user.username}</p>
          <div className={styles.location}>
            <SlLocationPin size={'1.25rem'} />
            {user.locatedAt ? <p>{user.locatedAt}</p> : <p>Location unknown</p>}
          </div>
        </div>
      </div>
      <div className={styles.joined}>
        <FaRegCalendar />
        <p>Joined {user.joinedAt}</p>
      </div>
      {user.about ? (
        <p className={styles.about}>{user.about}</p>
      ) : (
        <p className={styles.about}>User description does not exist</p>
      )}
      <hr className={styles.hr} />
      <div className={styles.stats}>
        <div className={styles.col}>
          <p className={styles.stat}>{user.comments.length}</p>
          <p className={styles.feedback}>Comments</p>
        </div>
        <div className={styles.col}>
          <p className={styles.stat}>{user.likes.length}</p>
          <p className={styles.feedback}>Likes</p>
        </div>
      </div>
      <hr style={{ marginTop: '1.5rem' }} className={styles.hr} />
    </div>
  );
}
