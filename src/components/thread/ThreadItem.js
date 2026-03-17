import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {postedAt} from '../../utils/date';
import {
  FiMessageCircle,
  FiThumbsUp,
  FiThumbsDown,
} from 'react-icons/fi';
import {Avatar} from '../common/avatar';

export const ThreadItem = ({
  thread,
  authUser,
  onVoteThread,
}) => {
  const isUpVoted =
    !!authUser && thread.upVotesBy.includes(authUser.id);

  const isDownVoted =
    !!authUser && thread.downVotesBy.includes(authUser.id);

  const handleUpVote = () => {
    if (!authUser) return;

    if (isUpVoted) {
      onVoteThread(0);
    } else {
      onVoteThread(1);
    }
  };

  const handleDownVote = () => {
    if (!authUser) return;

    if (isDownVoted) {
      onVoteThread(0);
    } else {
      onVoteThread(-1);
    }
  };

  return (
    <div className="thread-category">
      {thread.category && (
        <span className="tag">#{thread.category}</span>
      )}

      <h3 className="thread-title">
        <Link to={`/threads/${thread.id}`}>
          {thread.title}
        </Link>
      </h3>

      <p className="thread-body">
        {thread.body.slice(0, 140)}...
      </p>

      <div className="thread-footer">
        <button
          onClick={handleUpVote}
          disabled={!authUser}
          className={`vote-btn ${
            isUpVoted ? 'active up' : ''
          }`}
        >
          <FiThumbsUp /> {thread.upVotesBy.length}
        </button>

        <button
          onClick={handleDownVote}
          disabled={!authUser}
          className={`vote-btn ${
            isDownVoted ? 'active down' : ''
          }`}
        >
          <FiThumbsDown /> {thread.downVotesBy.length}
        </button>

        <span>
          <FiMessageCircle /> {thread.totalComments}
        </span>

        <span>{postedAt(thread.createdAt)}</span>

        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          {thread.owner?.avatar && (
            <Avatar
              src={thread.owner.avatar}
              alt={thread.owner.name}
            />
          )}
          Dibuat oleh {thread.owner?.name ?? 'Unknown'}
        </span>
      </div>
    </div>
  );
};

ThreadItem.propTypes = {
  thread: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    category: PropTypes.string,
    createdAt: PropTypes.string.isRequired,
    totalComments: PropTypes.number,
    upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    owner: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      avatar: PropTypes.string,
    }),
  }).isRequired,
  authUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
  onVoteThread: PropTypes.func.isRequired,
};
