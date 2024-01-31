import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import styles from './CommentForm.module.css';
import { createComment } from '../../lib/postActions';

export default function CommentForm({ postId }) {
  const queryClient = useQueryClient();
  const { status } = useSession();
  const router = useRouter();
  const [content, setContent] = useState('');

  const { mutate } = useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      setContent('');
      setTimeout(() => {
        queryClient.invalidateQueries(['post']);
      }, 1000);
    },
  });

  const addComment = (e) => {
    e.preventDefault();
    const btn = e.target;
    if (status === 'unauthenticated') {
      toast.error('Please log in to comment');
      return router.push('/login');
    }
    const payload = { content, postId };
    btn.disabled = true;
    btn.style.backgroundColor = '#15803d';
    btn.textContent = 'Posting...';
    mutate(payload);
    toast.success('Comment posted!');
    setTimeout(() => {
      btn.textContent = 'Post';
      btn.style.backgroundColor = '#0a9e01';
      btn.disabled = false;
    }, 1000);
  };

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <textarea
          rows={5}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder='What do you think?'
          required
        ></textarea>
        <div className={styles.btnDiv}>
          <button
            disabled={content.length === 0}
            className={styles.addBtn}
            type='submit'
            onClick={addComment}
          >
            POST
          </button>
        </div>
      </form>
    </div>
  );
}
