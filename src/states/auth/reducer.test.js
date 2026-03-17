/**
 * Skenario test authReducer
 * - should return initial state when given undefined state
 * - should return user when given AUTH_USER action
 */

import {authReducer} from './reducer';
import {AUTHENTICATE} from './action';

describe('authReducer', () => {
  it('should return initial state when given undefined state', () => {
    const action = {type: 'UNKNOWN'};

    const nextState = authReducer(undefined, action);

    expect(nextState).toBe(null);
  });

  it('should return user when given AUTH_USER action', () => {
    const fakeUser = {
      id: 'user-1',
      name: 'Rizky',
    };

    const action = {
      type: AUTHENTICATE.AUTH_USER,
      payload: fakeUser,
    };

    const nextState = authReducer(null, action);

    expect(nextState).toEqual(fakeUser);
  });
});

