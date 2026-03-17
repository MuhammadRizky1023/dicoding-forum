import {hideLoading, showLoading} from '@dimasmds/react-redux-loading-bar';
import api from '../../utils/api';

export const leaderboardsAction = {
  LEADERBOARDS: 'RECEIVE_LEADERBOARDS',
};

export const leaderBoards = (leaderboards) => {
  return {
    type: leaderboardsAction.LEADERBOARDS,
    payload: leaderboards,
  };
};

export const fetchingLeaderboards = () => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const leaderboards = await api.getLeaderboards();
      dispatch(leaderBoards(leaderboards));
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
};
