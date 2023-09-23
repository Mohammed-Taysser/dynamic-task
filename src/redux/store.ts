import { configureStore } from '@reduxjs/toolkit';
import auth from './slices/auth';
import contacts from './slices/contacts';

const store = configureStore({
  reducer: {
    auth,
    contacts,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
