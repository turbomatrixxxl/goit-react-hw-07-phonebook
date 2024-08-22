import { createSlice } from '@reduxjs/toolkit';

import { fetchContacts, addContact, deleteContact } from '../operations';

const handlePending = state => {
  state.contacts.isLoading = true;
  state.contacts.error = null;
};

const handleRejected = (state, action) => {
  state.contacts.isLoading = false;
  state.contacts.error = action.payload;
};

const initialState = {
  contacts: { items: [], isLoading: false, error: null },
  filter: '',
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: initialState,
  reducers: {
    filterContact: {
      reducer(state, action) {
        state.filter = action.payload.searchtherm;
      },
      prepare(searchTherm) {
        return {
          payload: { searchtherm: searchTherm },
        };
      },
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, handlePending)
      .addCase(fetchContacts.fulfilled, (state, action) => {
        // console.log(action.payload);
        // console.log(state.contacts.items);

        state.contacts.isLoading = false;
        state.contacts.error = null;
        state.contacts.items = action.payload;
      })
      .addCase(fetchContacts.rejected, handleRejected)

      .addCase(addContact.pending, handlePending)
      .addCase(addContact.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.error = null;
        state.contacts.items.push(action.payload);
      })
      .addCase(addContact.rejected, handleRejected)

      .addCase(deleteContact.pending, handlePending)
      .addCase(deleteContact.fulfilled, (state, action) => {
        console.log(action.payload);

        state.contacts.isLoading = false;
        state.contacts.error = null;
        const index = state.contacts.items.findIndex(
          contact => contact.id === action.payload.id
        );

        state.contacts.items.splice(index, 1);
      })
      .addCase(deleteContact.rejected, handleRejected);
  },
});

// Exportăm generatoarelor de acțiuni și reducer-ul
export const { filterContact } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
