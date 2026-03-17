import PropTypes from 'prop-types';
import {Avatar} from '../common/avatar';
import {postedAt} from '../../utils/date';
import {FiThumbsUp, FiThumbsDown} from 'react-icons/fi';
import {
  BsFillHandThumbsUpFill,
  BsFillHandThumbsDownFill,
} from 'react-icons/bs';

export const CommentItem = ({comment, authUser, onVote}) => {
  const isUpVoted =
    !!authUser && comment.upVotesBy.includes(authUser.id);

  const isDownVoted =
    !!authUser && comment.downVotesBy.includes(authUser.id);

  return (
    <li className="comment-item">
      <Avatar src={comment.owner.avatar} />

      <div className="comment-content">
        <p className="comment-owner">
          <strong>{comment.owner.name}</strong>
        </p>

        <p className="comment-text">{comment.content}</p>

        <div className="comment-meta">
          <button
            className={`vote-btn ${isUpVoted ? 'active up' : ''}`}
            onClick={() => onVote(comment.id, 1)}
            disabled={!authUser}
          >
            {isUpVoted ?
              <BsFillHandThumbsUpFill /> :
              <FiThumbsUp />}
            <span>{comment.upVotesBy.length}</span>
          </button>

          <button
            className={`vote-btn ${isDownVoted ? 'active down' : ''}`}
            onClick={() => onVote(comment.id, -1)}
            disabled={!authUser}
          >
            {isDownVoted ?
              <BsFillHandThumbsDownFill /> :
              <FiThumbsDown />}
            <span>{comment.downVotesBy.length}</span>
          </button>

          <span className="comment-time">
            {postedAt(comment.createdAt)}
          </span>
        </div>
      </div>
    </li>
  );
};


CommentItem.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    owner: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,

  authUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),

  onVote: PropTypes.func.isRequired,
};
