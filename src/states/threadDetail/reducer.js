import {DetailAction} from './action';

export const threadDetailReducer = (thread = null, action) => {
  switch (action.type) {
    case DetailAction.THREAD_DETAIL:
      return action.payload;

    case DetailAction.CLEAR_THREAD_DETAIL:
      return null;

    case DetailAction.THREAD_VOTE: {
      if (!thread) return thread;

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
    }

    case DetailAction.COMMENTS:
      if (!thread) return thread;

      return {
        ...thread,
        comments: [
          action.payload,
          ...(thread.comments || []),
        ],
      };

    case DetailAction.COMMENT_VOTE: {
      if (!thread) return thread;

      const {commentId, userId, voteType} = action.payload;

      return {
        ...thread,
        comments: (thread.comments || []).map((comment) => {
          if (comment.id !== commentId) {
            return comment;
          }

          const currentUpVotes = comment.upVotesBy || [];
          const currentDownVotes = comment.downVotesBy || [];

          const filteredUpVotes =
            currentUpVotes.filter((id) => id !== userId);

          const filteredDownVotes =
            currentDownVotes.filter((id) => id !== userId);

          if (voteType === 1) {
            return {
              ...comment,
              upVotesBy: [...filteredUpVotes, userId],
              downVotesBy: filteredDownVotes,
            };
          }

          if (voteType === -1) {
            return {
              ...comment,
              upVotesBy: filteredUpVotes,
              downVotesBy: [...filteredDownVotes, userId],
            };
          }

          return {
            ...comment,
            upVotesBy: filteredUpVotes,
            downVotesBy: filteredDownVotes,
          };
        }),
      };
    }

    default:
      return thread;
  }
};
