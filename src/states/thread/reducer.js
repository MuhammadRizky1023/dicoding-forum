import {ThreadAction} from './action';

export const threadsReducer = (threads = [], action) => {
  switch (action.type) {
    case ThreadAction.LIST_THREAD:
      return action.payload;

    case ThreadAction.ADD_THREAD:
      return [action.payload, ...threads];

    case 'THREAD_VOTE_LIST':
      return threads.map((thread) => {
        if (thread.id !== action.payload.threadId) {
          return thread;
        }

        const {userId, voteType} = action.payload;

        const currentUpVotes = thread.upVotesBy || [];
        const currentDownVotes = thread.downVotesBy || [];

        const filteredUpVotes =
          currentUpVotes.filter((id) => id !== userId);

        const filteredDownVotes =
          currentDownVotes.filter((id) => id !== userId);

        if (voteType === 1) {
          return {
            ...thread,
            upVotesBy: [...filteredUpVotes, userId],
            downVotesBy: filteredDownVotes,
          };
        }

        if (voteType === -1) {
          return {
            ...thread,
            upVotesBy: filteredUpVotes,
            downVotesBy: [...filteredDownVotes, userId],
          };
        }

        return {
          ...thread,
          upVotesBy: filteredUpVotes,
          downVotesBy: filteredDownVotes,
        };
      });

    default:
      return threads;
  }
};
