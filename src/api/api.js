import axios from 'axios';

// const BASE_URL_API = 'https://66bcd35624da2de7ff6bf860.mockapi.io/';
const CONTACTS_BASE_URL = 'https://66c73123732bf1b79fa5ad76.mockapi.io/';

// const api = axios.create({
//   baseURL: BASE_URL_API,
// });

// const resourceApi = resource => {
//   return {
//     getAll: () => api.get(`${resource}`),
//     getById: id => api.get(`${resource}/${id}`),
//     create: data => api.post(`${resource}`, data),
//     update: (id, data) => api.put(`${resource}/${id}`, data),
//     delete: id => api.delete(`${resource}/${id}`),
//   };
// };

// const tutorsApi = resourceApi('tutors');
// const facultiesApi = resourceApi('faculties');

const apiContacts = axios.create({
  baseURL: CONTACTS_BASE_URL,
});

const resourceApi = resource => {
  return {
    getAll: () => apiContacts.get(`${resource}`),
    getById: id => apiContacts.get(`${resource}/${id}`),
    create: data => apiContacts.post(`${resource}`, data),
    update: (id, data) => apiContacts.put(`${resource}/${id}`, data),
    delete: id => apiContacts.delete(`${resource}/${id}`),
  };
};

const contactsApi = resourceApi('contacts');

// export { tutorsApi, facultiesApi };
export { contactsApi };
