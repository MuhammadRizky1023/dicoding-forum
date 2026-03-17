import {hideLoading, showLoading} from '@dimasmds/react-redux-loading-bar';
import api from '../../utils/api';
import {toast} from 'react-toastify';

export const ThreadAction = {
  LIST_THREAD: 'LIST_THREADS',
  ADD_THREAD: 'CREATE_THREAD',
};

export const receiveThreads = (threads) => ({
  type: ThreadAction.LIST_THREAD,
  payload: threads,
});

export const addThread = (thread) => ({
  type: ThreadAction.ADD_THREAD,
  payload: thread,
});

export const asyncFetchThreads = () => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const threads = await api.getAllThreads();
      const users = await api.getAllUsers();

      const threadsWithOwner = threads.map((thread) => ({
        ...thread,
        owner: users.find((user) => user.id === thread.ownerId),
      }));

      dispatch(receiveThreads(threadsWithOwner));
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
};

export const asyncCreateThread = ({title, body, category}) => {
  return async (dispatch) => {
    dispatch(showLoading());
    const toastId = toast.loading('Membuat thread...');
    try {
      const thread = await api.createThread({title, body, category});
      dispatch(addThread(thread));

      toast.update(toastId, {
        render: 'Thread Anda berhasil dibuat 🎉',
        type: 'success',
        isLoading: false,
        autoClose: 2000,
      });
    } catch (error) {
      toast.update(toastId, {
        render: error.message || 'Gagal membuat thread',
        type: 'error',
        isLoading: false,
        autoClose: 3000,
      });
    } finally {
      dispatch(hideLoading());
    }
  };
};
