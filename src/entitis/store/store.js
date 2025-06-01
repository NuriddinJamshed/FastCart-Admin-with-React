import { configureStore } from '@reduxjs/toolkit';
import getSlice from '../reducers/getQuery'
import deleteSlice from '../reducers/deleteQuery'
import postSlice from "../reducers/postQuery"
import putSlice from "../reducers/putQuery"

export const store = configureStore({
  reducer: {
    get: getSlice,
    delete:deleteSlice,
    post:postSlice,
    put:putSlice
  },
});
