import {leaderboardsAction} from './action';

export const leaderboardsReducer = (leaderboards = [], action) => {
  switch (action.type) {
    case leaderboardsAction.LEADERBOARDS:
      return action.payload;
    default:
      return leaderboards;
  }
};
