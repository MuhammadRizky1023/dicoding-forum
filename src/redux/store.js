import {configureStore} from '@reduxjs/toolkit';
import reducer from '../states';


const store = configureStore({
  reducer: reducer,
});
export default store;
