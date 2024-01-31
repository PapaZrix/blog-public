import { BiUpvote } from 'react-icons/bi';
import styles from './UserActivity.module.css';
import UserAvatar from './UserAvatar';
import kebabCase from '../../lib/kebabCase';
import Image from 'next/image';

export default function UserActivity({ user, session }) {
  return (
    <div className={styles.container}>
      {user.comments.length === 0 ? (
        <div className={styles.wrapper}>
          {user.id === session?.user.id ? (
            <>
              <Image
                src='https://cdn.dribbble.com/users/1163441/screenshots/3064215/media/0f997b4546d9c4e22c08bad64fafaa95.gif'
                alt='no activity yet'
                objectFit='contain'
                width={600}
                height={300}
                quality={100}
                priority
                className={styles.gif}
              />
              <div className={styles.activity}>
                <h1>You have no activity yet</h1>
                <p>Read a post and leave your thoughts</p>
              </div>
            </>
          ) : (
            <>
              <Image
                src='https://cdn.dribbble.com/users/1163441/screenshots/3064215/media/0f997b4546d9c4e22c08bad64fafaa95.gif'
                alt='no activity yet'
                objectFit='contain'
                width={600}
                height={200}
                quality={100}
                priority
                className={styles.gif}
              />
              <div className={styles.activity}>
                <h1>User has no activity yet</h1>
              </div>
            </>
          )}
        </div>
      ) : (
        <>
          {user.comments
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((comment) => {
              return (
                <div key={comment.id} className={styles.comment}>
                  <div className={styles.left}>
                    <UserAvatar user={user} className={styles.image} />
                    <div className={styles.votes}>
                      <BiUpvote />
                      <p>{comment.likes.length}</p>
                    </div>
                  </div>
                  <div className={styles.right}>
                    <div className={styles.top}>
                      <p className={styles.name}>{user.username}</p>
                      <p className={styles.date}>{comment.createdAt}</p>
                    </div>
                    <p className={styles.content}>{comment.content}</p>
                    <p className={styles.ref}>
                      Commented on post -{' '}
                      <a
                        href={`/${kebabCase(comment.post.title)}#${comment.id}`}
                        className={styles.link}
                      >
                        {comment.post.title}
                      </a>
                    </p>
                  </div>
                </div>
              );
            })}
        </>
      )}
    </div>
  );
}
