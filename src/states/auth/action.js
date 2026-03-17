import {toast} from 'react-toastify';
import api from '../../utils/api';
import {hideLoading, showLoading} from '@dimasmds/react-redux-loading-bar';

export const AUTHENTICATE = {
  AUTH_USER: 'AUTH_USER',
};

export const setUser = (user) => ({
  type: AUTHENTICATE.AUTH_USER,
  payload: user,
});

export const asyncLogin = ({email, password}) => {
  return async (dispatch) => {
    dispatch(showLoading());
    const toastId = toast.loading('login process...');

    try {
      const token = await api.login({email, password});
      localStorage.setItem('token', token);
      const user = await api.getOwnProfile();

      dispatch(setUser(user));

      toast.update(toastId, {
        render: 'Login Success ✅',
        type: 'success',
        isLoading: false,
        autoClose: 2000,
      });

      return true;
    } catch (error) {
      toast.update(toastId, {
        render: error.message || 'Login failed 🚫',
        type: 'error',
        isLoading: false,
        autoClose: 3000,
      });

      return false;
    } finally {
      dispatch(hideLoading());
    }
  };
};
export const asyncRegister = ({name, email, password}) => {
  return async (dispatch) => {
    dispatch(showLoading());
    const toastId = toast.loading('registration process...');

    try {
      await api.register({name, email, password});

      toast.update(toastId, {
        render: 'Registration success ✅ please login',
        type: 'success',
        isLoading: false,
        autoClose: 2500,
      });

      return true;
    } catch (error) {
      toast.update(toastId, {
        render: error.message || 'Registration failed 🚫',
        type: 'error',
        isLoading: false,
        autoClose: 3000,
      });

      return false;
    } finally {
      dispatch(hideLoading());
    }
  };
};
