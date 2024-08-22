import { contactsReducer } from './contacts/contactsSlice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    contactsSlice: contactsReducer,
  },
});
