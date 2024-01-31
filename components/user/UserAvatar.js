import Image from 'next/image';
import styles from './UserAvatar.module.css';

const Avatar = ({ className, children }) => {
  return <div className={className}>{children}</div>;
};

export default function UserAvatar({ user, className }) {
  return (
    <Avatar className={className}>
      {user?.image ? (
        <div className={styles.container}>
          <Image
            src={user?.image}
            alt='profile picture'
            layout='fill'
            className={styles.image}
          />
        </div>
      ) : (
        <div className={styles.container}>
          <Image
            src='/images/avatar.png'
            alt='profile picture'
            layout='fill'
            className={styles.image}
          />
        </div>
      )}
    </Avatar>
  );
}
