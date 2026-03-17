import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import {ThreadItem} from './ThreadItem';
import {CommentItem} from '../comment/commentItem';

export const ThreadDetail = ({
  thread,
  authUser,
  comment,
  onCommentChange,
  onCommentSubmit,
  onVoteComment,
  onVoteThread,
}) => {
  return (
    <section className="thread-detail">
      <ThreadItem
        thread={thread}
        onVoteThread={onVoteThread}
        authUser={authUser}
        isDetail
      />

      <hr />
      <h3>Beri komentar</h3>

      {authUser ? (
        <form onSubmit={onCommentSubmit}>
          <textarea
            value={comment}
            onChange={onCommentChange}
            placeholder="Tulis komentar..."
            required
          />
          <button type="submit">Kirim</button>
        </form>
      ) : (
        <p>
          <Link to="/login">Login</Link> untuk memberi komentar
        </p>
      )}

      <h3>Komentar ({thread.comments.length})</h3>

      <ul className="comment-list">
        {thread.comments.map((item) => (
          <CommentItem
            key={item.id}
            comment={item}
            authUser={authUser}
            onVote={onVoteComment}
          />
        ))}
      </ul>
    </section>
  );
};

ThreadDetail.propTypes = {
  thread: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    category: PropTypes.string,
    createdAt: PropTypes.string.isRequired,
    upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    comments: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
      downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
      owner: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      }).isRequired,
    })).isRequired,
    owner: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  }).isRequired,

  authUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
  }),

  comment: PropTypes.string.isRequired,
  onCommentChange: PropTypes.func.isRequired,
  onCommentSubmit: PropTypes.func.isRequired,
  onVoteComment: PropTypes.func.isRequired,
  onVoteThread: PropTypes.func.isRequired,
};
