/**
 * Skenario test threadsReducer
 * - should return initial state when given unknown action
 * - should return threads when given LIST_THREAD action
 * - should add new thread when given ADD_THREAD action
 */

import {threadsReducer} from './reducer';
import {ThreadAction} from './action';

describe('threadsReducer', () => {
  it('should return initial state when given unknown action', () => {
    const action = {type: 'UNKNOWN'};

    const nextState = threadsReducer(undefined, action);

    expect(nextState).toEqual([]);
  });


  it('should return threads when given LIST_THREAD action', () => {
    const fakeThreads = [
      {id: 'thread-1', title: 'Thread 1'},
      {id: 'thread-2', title: 'Thread 2'},
    ];

    const action = {
      type: ThreadAction.LIST_THREAD,
      payload: fakeThreads,
    };

    const nextState = threadsReducer([], action);

    expect(nextState).toEqual(fakeThreads);
  });


  it('should add new thread when given ADD_THREAD action', () => {
    const initialThreads = [
      {id: 'thread-1', title: 'Thread 1'},
    ];

    const newThread = {
      id: 'thread-2',
      title: 'Thread 2',
    };

    const action = {
      type: ThreadAction.ADD_THREAD,
      payload: newThread,
    };

    const nextState = threadsReducer(initialThreads, action);

    expect(nextState).toEqual([
      newThread,
      ...initialThreads,
    ]);
  });
});
