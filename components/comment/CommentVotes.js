import { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { BiUpvote } from 'react-icons/bi';
import { useSession } from 'next-auth/react';
import styles from './CommentVotes.module.css';
import useWindowSize from '../../hooks/useWindowSize';

export default function CommentVotes({ userId, commentId, voted, voteAmt }) {
  const { data: session } = useSession();
  const [isVoted, setIsVoted] = useState(voted);
  const [votesAmt, setVotesAmt] = useState(voteAmt || 0);
  const window = useWindowSize();

  useEffect(() => {
    setIsVoted(voted);
  }, [voted]);

  const { mutate } = useMutation({
    mutationFn: async () => {
      setIsVoted(!isVoted);
      const payload = { commentId };
      await axios.patch('/api/post/comment/like', payload);
    },
    onSuccess: () => {
      if (isVoted === true) setVotesAmt((prev) => prev + 1);
      if (isVoted === false) setVotesAmt((prev) => prev - 1);
    },
  });

  return (
    <div className={styles.vote}>
      <BiUpvote
        size={window.width < 640 ? '2rem' : '1.5rem'}
        onClick={() => mutate()}
        style={{
          color: isVoted ? '#0a9e01' : 'rgb(63 63 70)',
          cursor: 'pointer',
        }}
        pointerEvents={userId === session?.user.id ? 'none' : 'auto'}
      />
      <p>{votesAmt}</p>
    </div>
  );
}
