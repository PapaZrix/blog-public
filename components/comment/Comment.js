import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { createComment } from '../../lib/postActions';
import toast from 'react-hot-toast';
import styles from './Comment.module.css';
import { BsReplyAll } from 'react-icons/bs';
import { formatTimeToNow } from '../../lib/formatDate';
import kebabCase from '../../lib/kebabCase';
import UserAvatar from '../user/UserAvatar';
import CommentVotes from './CommentVotes';
import useWindowSize from '../../hooks/useWindowSize';

export default function Comment({ comment, postId, voteAmt, voted }) {
  const queryClient = useQueryClient();
  const { data: session, status } = useSession();
  const router = useRouter();
  const [content, setContent] = useState('');
  const [isReplying, setIsRepyling] = useState(false);
  const [replyToId, setReplyToId] = useState(null);
  const window = useWindowSize();

  const nestedComments = comment.replies
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .map((reply) => {
      const replyVote = reply.likes?.some(
        (like) => like.userId === session?.user.id
      );
      return (
        <Comment
          comment={reply}
          postId={postId}
          key={reply.id}
          voteAmt={reply.likes.length}
          voted={replyVote}
        />
      );
    });

  const { mutate } = useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries(['post']);
      }, 1000);
    },
  });

  const handleReply = (e) => {
    setReplyToId(e.target.value);
    setIsRepyling(true);
  };

  const cancelReply = () => {
    setIsRepyling(false);
    setContent('');
  };

  const addReply = (e) => {
    e.preventDefault();
    const btn = e.target;
    if (status === 'unauthenticated') {
      toast.error('Please log in to comment');
      return router.push('/sign-in');
    }
    const payload = { content, postId, replyToId };
    btn.disabled = true;
    btn.style.backgroundColor = '#15803d';
    btn.textContent = 'Posting...';
    mutate(payload);
    toast.success('Comment posted!');
    setTimeout(() => {
      btn.textContent = 'Post';
      btn.style.backgroundColor = '#0a9e01';
      btn.disabled = false;
      setIsRepyling(false);
    }, 1000);
  };

  return (
    <div id={comment.id} className={styles.container}>
      <div className={styles.comment}>
        <div className={styles.inner}>
          <div className={styles.top}>
            <div className={styles.left}>
              <Link
                href={
                  comment.User.role === 'ADMIN'
                    ? `/author/${kebabCase(comment.User.username)}`
                    : `/user/${comment.userId}`
                }
              >
                <a>
                  <UserAvatar user={comment.User} className={styles.image} />
                </a>
              </Link>
              <p className={styles.name}>{comment.User.username}</p>
              <p className={styles.time}>
                {formatTimeToNow(new Date(comment.createdAt))}
              </p>
            </div>
            <div className={styles.right}>
              <button
                value={comment.id}
                className={styles.reply}
                onClick={handleReply}
              >
                <BsReplyAll
                  pointerEvents='none'
                  size={window.width < 640 ? '2rem' : '1.5rem'}
                />
              </button>
            </div>
          </div>
          <div className={styles.bottom}>
            <p className={styles.content}>{comment.content}</p>
          </div>
          <CommentVotes
            commentId={comment.id}
            voteAmt={voteAmt}
            voted={voted}
            userId={comment.userId}
          />
        </div>
      </div>
      {isReplying ? (
        <div className={styles.form}>
          <form>
            <div>
              <textarea
                rows={5}
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder='What do you think?'
                className={styles.textarea}
                autoFocus
              />
            </div>
            <div className={styles.buttons}>
              <button
                onClick={cancelReply}
                type='button'
                className={styles.rbutton}
              >
                CANCEL
              </button>
              <button
                disabled={content.length === 0}
                type='submit'
                onClick={addReply}
                className={styles.gbutton}
              >
                POST
              </button>
            </div>
          </form>
        </div>
      ) : null}
      {nestedComments.length > 0 ? (
        <div className={styles.nested}>{nestedComments}</div>
      ) : null}
    </div>
  );
}
