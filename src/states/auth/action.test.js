/**
 * Skenario test asyncLogin & asyncRegister:
 * - should dispatch action correctly when login & Register success
 * - should return false when login & Register failed
 */

import {asyncLogin, setUser, asyncRegister} from './action';
import api from '../../utils/api';
import {showLoading, hideLoading} from '@dimasmds/react-redux-loading-bar';

jest.mock('../../utils/api');

describe('asyncLogin Thunk', () => {
  it('should dispatch action correctly when login success', async () => {
    const fakeToken = 'fake-token';
    const fakeUser = {id: 'user-1', name: 'Rizky'};
    const dispatch = jest.fn();

    api.login = jest.fn(() => Promise.resolve(fakeToken));
    api.getOwnProfile = jest.fn(() => Promise.resolve(fakeUser));

    const result = await asyncLogin({
      email: 'test@mail.com',
      password: '123456',
    })(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(setUser(fakeUser));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(result).toBe(true);
  });

  it('should return false when login failed', async () => {
    const dispatch = jest.fn();

    api.login = jest.fn(() =>
      Promise.reject(new Error('Login failed')),
    );

    const result = await asyncLogin({
      email: 'test@mail.com',
      password: 'wrong',
    })(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(result).toBe(false);
  });
});

describe('asyncRegister Thunk', () => {
  it('should return true when register success', async () => {
    const dispatch = jest.fn();

    api.register = jest.fn(() => Promise.resolve());

    const result = await asyncRegister({
      name: 'Rizy',
      email: 'test@mail.com',
      password: '123456',
    })(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(result).toBe(true);
  });

  it('should return false when register failed', async () => {
    const dispatch = jest.fn();

    api.register = jest.fn(() =>
      Promise.reject(new Error('Register failed')),
    );

    const result = await asyncRegister({
      name: 'Rizy',
      email: 'test@mail.com',
      password: '123456',
    })(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(result).toBe(false);
  });
});
