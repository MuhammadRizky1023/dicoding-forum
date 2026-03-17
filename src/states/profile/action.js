import api from '../../utils/api';
import {showLoading, hideLoading} from '@dimasmds/react-redux-loading-bar';

export const ProfileAction = {
  SET_PROFILE: 'SET_PROFILE',
};

export const setProfile = (profile) => ({
  type: ProfileAction.SET_PROFILE,
  payload: profile,
});

export const asyncProfile = () => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const user = await api.getOwnProfile();
      dispatch(setProfile(user));
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
};
