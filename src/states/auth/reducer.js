import {AUTHENTICATE} from './action';


export const authReducer = (user = null, action) => {
  switch (action.type) {
    case AUTHENTICATE.AUTH_USER:
      return action.payload;
    default:
      return user;
  }
};
