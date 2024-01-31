import { useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import styles from '../styles/Auth.module.css';
import axios from 'axios';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import Loader from '../components/layout/Loader';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      await axios.post('/api/register', { email, username, password });

      toast.success('Account created!');

      await signIn('credentials', {
        email: email,
        password: password,
        redirect: false,
      });

      router.push('/');
    } catch (error) {
      toast.error('Something went wrong, try again!');
    } finally {
      setIsLoading(false);
      setEmail('');
      setUsername('');
      setPassword('');
    }
  };
  console.log(isLoading);
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type='text'
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type='submit'>
            {isLoading ? (
              <div className='spinner'>
                <Loader />
              </div>
            ) : (
              'Create Character'
            )}
          </button>
          <div className={styles.cta}>
            <div>
              Already have an account? <Link href='/login'>Respawn</Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
