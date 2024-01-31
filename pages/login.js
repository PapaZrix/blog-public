import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import styles from '../styles/Auth.module.css';
import Link from 'next/link';

export default function Login() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signIn('credentials', {
      email: userInfo.email,
      password: userInfo.password,
      redirect: false,
    });

    setUserInfo({ email: '', password: '' });

    if (res.ok) {
      toast.success('Welcome back!');
      setTimeout(() => {
        router.push('/');
      }, 1000);
    } else {
      toast.error('Wrong email and/or password!');
    }
  };

  return (
    <>
      <div className={styles.login}>
        <form onSubmit={handleSubmit}>
          <h1>
            Press<span style={{ color: '#0a9e01' }}>To</span>Interact
          </h1>
          <input
            type='email'
            placeholder='Email'
            value={userInfo.email}
            onChange={(e) =>
              setUserInfo({ ...userInfo, email: e.target.value })
            }
          />
          <input
            type='password'
            placeholder='**********'
            value={userInfo.password}
            onChange={(e) =>
              setUserInfo({ ...userInfo, password: e.target.value })
            }
          />
          <button type='submit'>Respawn</button>
          <div className={styles.cta}>
            <div>
              <p> {`Don't have a Character yet?`}</p>
              <Link href='/register'>Create Character</Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
