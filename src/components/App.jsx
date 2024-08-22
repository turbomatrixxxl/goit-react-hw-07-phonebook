import React, { useEffect } from 'react';

import ContactBook from './ContactBook';
import { useDispatch } from 'react-redux';
import { fetchContacts } from '../redux/operations';

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
      }}
    >
      <ContactBook />
    </div>
  );
};
