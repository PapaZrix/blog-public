import { useSession } from 'next-auth/react';
import CommentForm from './CommentForm';
import styles from './CommentSection.module.css';
import Comment from './Comment';

export default function CommentSection({ comments, postId }) {
  const { data: session } = useSession();

  return (
    <div className={styles.container} id='comments'>
      <div className={styles['heading-section']}>
        <h2>CONVERSATION</h2>
        <p className={styles.count}>{comments.length} Comments</p>
      </div>
      <div className={styles['comments-div']}>
        <CommentForm postId={postId} />
        <div className={styles.comments} id='comments'>
          {comments
            .filter((comment) => !comment.replyToId)
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((topLevelComment) => {
              const topLevelCommentVote = topLevelComment.likes?.some(
                (vote) => vote.userId === session?.user.id
              );

              return (
                <Comment
                  comment={topLevelComment}
                  postId={postId}
                  key={topLevelComment.id}
                  voteAmt={topLevelComment.likes.length}
                  voted={topLevelCommentVote}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}
