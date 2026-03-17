import PropTypes from 'prop-types';
import {ThreadItem} from './ThreadItem';

export const ThreadList = ({
  threads,
  authUser,
  onVoteThread,
}) => {
  return (
    <div>
      {threads.map((thread) => (
        <ThreadItem
          key={thread.id}
          thread={thread}
          authUser={authUser}
          onVoteThread={(voteType) =>
            onVoteThread(thread.id, voteType)
          }
        />
      ))}
    </div>
  );
};
ThreadList.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.object).isRequired,
  authUser: PropTypes.object,
  onVoteThread: PropTypes.func.isRequired,
};
