import PostCard from './PostCard';
import kebabCase from '../../lib/kebabCase';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { IoCaretDownCircleOutline } from 'react-icons/io5';
import styles from './CollectionCard.module.css';
import useWindowSize from '../../hooks/useWindowSize';
import Image from 'next/image';
import CollectionModal from './CollectionModal';
import { useRouter } from 'next/router';

export default function CollectionCard({ collection }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const rotate = isOpen ? styles.rotate : '';
  const window = useWindowSize();

  const openEdit = () => {
    setIsModal(true);
  };

  return (
    <>
      {isModal && <CollectionModal collection={collection} />}
      <div className={styles.bundle}>
        <div className={styles.left}>
          <Image
            src={collection.thumbnail}
            alt='collection thumbnail'
            layout='fill'
            objectPosition='50% 50%'
            priority
            placeholder='blur'
            blurDataURL={collection.thumbnail}
          />
        </div>
        <div className={styles.right}>
          {router.pathname === '/admin/dashboard' && (
            <CollectionModal collection={collection} />
          )}
          <div>
            <h2>{collection.name}</h2>
          </div>
          <p className={styles.author}>
            Collection by{' '}
            <Link href={`/author/${kebabCase(collection.user.username)}`}>
              <span>{collection.user.username}</span>
            </Link>
          </p>
          {collection.posts.length > 1 ? (
            <p className={styles.length}>
              {collection.posts.length} Posts in Bundle
            </p>
          ) : (
            <p className={styles.length}>1 Post in Bundle</p>
          )}
          <p
            className={styles.description}
            style={{ display: window.width < 640 ? 'none' : 'block' }}
          >
            {collection.description}
          </p>
          <div
            onClick={() => {
              setIsOpen(!isOpen);
            }}
            className={styles.open}
          >
            <p>See all posts</p>
            <IoCaretDownCircleOutline
              size={window.width < 640 ? '2rem' : '1.5rem'}
              className={`${styles.caret} ${rotate}`}
            />
          </div>
        </div>
      </div>
      {isOpen &&
        collection.posts.map((post) => {
          return (
            <div key={post.id}>
              <PostCard post={post} />
            </div>
          );
        })}
    </>
  );
}
