import {hideLoading, showLoading} from '@dimasmds/react-redux-loading-bar';
import api from '../../utils/api';

export const DetailAction = {
  THREAD_DETAIL: 'THREAD_DETAIL',
  CLEAR_THREAD_DETAIL: 'CLEAR_THREAD',
  COMMENTS: 'COMMENTS',
  THREAD_VOTE: 'THREAD_VOTE',
  COMMENT_VOTE: 'COMMENT_VOTE',
};

export const receiveThreadDetail = (thread) => ({
  type: DetailAction.THREAD_DETAIL,
  payload: thread,
});

export const clearThreadDetail = () => ({
  type: DetailAction.CLEAR_THREAD_DETAIL,
});

export const receiveComment = (comment) => ({
  type: DetailAction.COMMENTS,
  payload: comment,
});

export const toggleThreadVote = ({userId, voteType}) => ({
  type: DetailAction.THREAD_VOTE,
  payload: {userId, voteType},
});

export const toggleCommentVote = ({commentId, userId, voteType}) => ({
  type: DetailAction.COMMENT_VOTE,
  payload: {commentId, userId, voteType},
});

export const fetchingThreadDetail = function(threadId) {
  return async function(dispatch) {
    dispatch(showLoading());
    dispatch(clearThreadDetail());

    try {
      const thread = await api.getDetailThread(threadId);
      dispatch(receiveThreadDetail(thread));
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
};

export const createdComment = function({threadId, content}) {
  return async function(dispatch) {
    try {
      const comment = await api.createComment({
        threadId,
        content,
      });
      dispatch(receiveComment(comment));
    } catch (error) {
      alert(error.message);
    }
  };
};

export const voteThread = function({threadId, voteType}) {
  return async function(dispatch, getState) {
    const {authUser} = getState();

    try {
      if (voteType === 1) {
        await api.upVoteThread(threadId);
      } else if (voteType === -1) {
        await api.downVoteThread(threadId);
      } else {
        await api.neutralVoteThread(threadId);
      }

      dispatch(toggleThreadVote({
        userId: authUser.id,
        voteType,
      }));

      dispatch({
        type: 'THREAD_VOTE_LIST',
        payload: {
          threadId,
          userId: authUser.id,
          voteType,
        },
      });
    } catch (error) {
      alert(error.message);
    }
  };
};

export const voteComment = function({threadId, commentId, voteType}) {
  return async function(dispatch, getState) {
    const {authUser} = getState();

    try {
      if (voteType === 1) {
        await api.upVoteComment({
          threadId,
          commentId,
        });
      } else if (voteType === -1) {
        await api.downVoteComment({
          threadId,
          commentId,
        });
      } else {
        await api.neutralVoteComment({
          threadId,
          commentId,
        });
      }

      dispatch(toggleCommentVote({
        userId: authUser.id,
        commentId,
        voteType,
      }));
    } catch (error) {
      alert(error.message);
    }
  };
};
