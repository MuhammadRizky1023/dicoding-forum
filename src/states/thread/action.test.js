/**
 * Skenario test asyncFetchThreads
 * - should dispatch receiveThreads when API success
 * - should dispatch hideLoading after fetching
 */

import {
  asyncFetchThreads,
  receiveThreads,
  asyncCreateThread,
  addThread,
} from './action';

import api from '../../utils/api';
import {showLoading, hideLoading}
  from '@dimasmds/react-redux-loading-bar';

jest.mock('../../utils/api');

describe('thread_thunk', () => {
  it(
      'should dispatch receiveThreads when fetching threads success',
      async () => {
        const dispatch = jest.fn();

        const fakeThreads = [
          {id: 'thread-1', title: 'Thread 1', ownerId: 'user-1'},
        ];

        const fakeUsers = [
          {id: 'user-1', name: 'Rizky'},
        ];

        api.getAllThreads = jest.fn(() =>
          Promise.resolve(fakeThreads),
        );

        api.getAllUsers = jest.fn(() =>
          Promise.resolve(fakeUsers),
        );

        await asyncFetchThreads()(dispatch);

        const threadWithOwner = [
          {
            id: 'thread-1',
            title: 'Thread 1',
            ownerId: 'user-1',
            owner: {id: 'user-1', name: 'Rizky'},
          },
        ];

        expect(dispatch).toHaveBeenCalledWith(showLoading());
        expect(dispatch).toHaveBeenCalledWith(
            receiveThreads(threadWithOwner),
        );
        expect(dispatch).toHaveBeenCalledWith(hideLoading());
      },
  );

  it(
      'should dispatch addThread when create thread success',
      async () => {
        const dispatch = jest.fn();

        const fakeThread = {
          id: 'thread-1',
          title: 'New Thread',
          body: 'Thread body',
          category: 'general',
        };

        api.createThread = jest.fn(() =>
          Promise.resolve(fakeThread),
        );

        await asyncCreateThread({
          title: 'New Thread',
          body: 'Thread body',
          category: 'general',
        })(dispatch);

        expect(dispatch).toHaveBeenCalledWith(showLoading());
        expect(dispatch).toHaveBeenCalledWith(
            addThread(fakeThread),
        );
        expect(dispatch).toHaveBeenCalledWith(hideLoading());
      },
  );
});
