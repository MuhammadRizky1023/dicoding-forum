import {ProfileAction} from './action';

export const profileReducer = (state = null, action) => {
  switch (action.type) {
    case ProfileAction.SET_PROFILE:
      return action.payload;

    default:
      return state;
  }
};
