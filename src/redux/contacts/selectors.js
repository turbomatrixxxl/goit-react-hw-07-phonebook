export const selectContacts = state => state.contactsSlice.contacts.items;
export const selectFilter = state => state.contactsSlice.filter;

export const selectLoading = state => state.contactsSlice.contacts.isLoading;
export const selectError = state => state.contactsSlice.contacts.error;
