import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UploadDropzone } from '@uploadthing/react';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { updateUser } from '../../lib/postActions';
import styles from './UserSettings.module.css';
import toast from 'react-hot-toast';
import Loader from '../layout/Loader';

export default function UserSettings({ user }) {
  const queryClient = useQueryClient();
  const { update } = useSession();
  const [username, setUsername] = useState(user.username);
  const [about, setAbout] = useState(user.about || '');
  const [location, setLocation] = useState(user.locatedAt || '');
  const [image, setImage] = useState(user.image || null);
  const [dirty, setDirty] = useState(false);
  const [loading, setLoading] = useState(false);

  const { mutate } = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries(['user']);
        update({
          username: username,
          about: about,
          locatedAt: location,
          image: image,
        });
      }, 1000);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const id = user.id;
      const payload = { username, about, location, image, id };
      mutate(payload);
      toast.success('Changes made successfully');
    } catch (error) {
      toast.error(error);
    } finally {
      setUsername(username);
      setAbout(about);
      setLocation(location);
      setImage(image);
      setLoading(false);
    }
  };

  return (
    <div>
      <form className={styles.form} onChange={() => setDirty(true)}>
        <div className={styles.container}>
          <h1>Profile Settings</h1>
          <button
            disabled={!dirty}
            onClick={handleSubmit}
            type='submit'
            className={styles.submit}
            style={{ backgroundColor: !dirty ? 'lightgray' : '#0a9e01' }}
          >
            {loading ? (
              <div className='spinner'>
                <Loader />
              </div>
            ) : (
              'Save'
            )}
          </button>
        </div>
        <div className={styles.row}>
          <label htmlFor='email' className={styles.label}>
            Email
          </label>
          <input
            id='email'
            className={styles.input}
            disabled
            defaultValue={user.email}
          />
        </div>
        <div className={styles.row}>
          <label htmlFor='username' className={styles.label}>
            Username
          </label>
          <input
            maxLength={30}
            id='username'
            className={styles.input}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className={styles.row}>
          <label htmlFor='about' className={styles.label}>
            About
          </label>
          <input
            id='about'
            className={styles.input}
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />
        </div>
        <div className={styles.row}>
          <label htmlFor='locatedAt' className={styles.label}>
            Location
          </label>
          <input
            maxLength={50}
            id='locatedAt'
            className={styles.input}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className={styles.row}>
          <p className={styles.label}>Profile Picture</p>
          <UploadDropzone
            endpoint='imageUploader'
            appearance={{
              button({ isUploading }) {
                return {
                  backgroundColor: '#0a9e01',
                  border: 'none',
                  cursor: 'pointer',
                  width: '100%',
                  ...(isUploading && { backgroundColor: '#15803d' }),
                };
              },
              container: {
                width: '100%',
                padding: '1rem',
                marginTop: '0',
                gap: '0.5rem',
              },
              label: {
                fontSize: '1.5rem',
                width: '100%',
                color: '#0a9e01',
                marginTop: '0',
              },
              uploadIcon: {
                height: '2.5rem',
                width: '2.5rem',
              },
              allowedContent: {
                fontSize: '1rem',
              },
            }}
            onClientUploadComplete={(res) => {
              setImage(res[0].url);
            }}
          />
        </div>
      </form>
    </div>
  );
}
