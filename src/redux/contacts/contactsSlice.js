import { createSlice, nanoid } from '@reduxjs/toolkit';

const localstorageContacts = localStorage.getItem('contacts');
const localContacts = JSON.parse(localstorageContacts);
// console.log(localContacts);

let initialState = {
  contacts: localContacts,
  filter: '',
};

if (initialState.contacts === null) {
  initialState = {
    contacts: [],
    filter: '',
  };
}

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: initialState,
  reducers: {
    addContact: {
      reducer(state, action) {
        state.contacts.push(action.payload);
      },
      prepare(contact) {
        return {
          payload: {
            id: nanoid(),
            ...contact,
          },
        };
      },
    },
    deleteContact: {
      reducer(state, action) {
        const index = state.contacts.findIndex(
          contact => contact.id === action.payload.id
        );
        state.contacts.splice(index, 1);
      },
      prepare(contactId) {
        return {
          payload: { id: contactId },
        };
      },
    },
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
});

// Exportăm generatoarelor de acțiuni și reducer-ul
export const { addContact, deleteContact, filterContact } =
  contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
