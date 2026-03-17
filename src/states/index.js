import {authReducer} from './auth/reducer';
import {threadsReducer} from './thread/reducer';
import {threadDetailReducer} from './threadDetail/reducer';
import {leaderboardsReducer} from './leaderboard/reducer';
import {combineReducers} from '@reduxjs/toolkit';
import {loadingBarReducer} from '@dimasmds/react-redux-loading-bar';

const reducer = combineReducers({
  authUser: authReducer,
  threads: threadsReducer,
  threadDetail: threadDetailReducer,
  leaderboards: leaderboardsReducer,
  loadingBar: loadingBarReducer,
});

export default reducer;
