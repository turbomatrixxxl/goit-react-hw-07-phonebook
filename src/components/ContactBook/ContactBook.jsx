import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Form from 'components/form';
import Input from 'components/common/input';
import Button from 'components/common/button';

import styles from './ContactBook.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  addContact,
  deleteContact,
  filterContact,
} from '../../redux/contacts/contactsSlice';
import { getContacts, getFilter } from '../../redux/contacts/selectors';
import { useDebounce } from '@uidotdev/usehooks';

export default function ContactBook() {
  const [newContact, setNewContact] = useState({
    name: '',
    number: '',
  });
  const [disabled, setDisabled] = useState(true);
  const [searchTherm, setSearchTherm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTherm, 1000);

  const initialContacts = useSelector(getContacts);
  // console.log(initialContacts);
  // console.log(initialContacts.includes(null) === false);

  const filter = useSelector(getFilter);
  // console.log(filter);

  const dispatch = useDispatch();

  // localStorage.clear();

  useEffect(() => {
    async function fetchContacts() {
      try {
        if (
          initialContacts === null ||
          initialContacts.length === 0 ||
          initialContacts.includes(null)
        ) {
          alert('Nu aveti contacte salvate in lista !');
          return;
        }
      } catch (error) {
        alert('Nu aveti contacte salvate in lista !');
        // console.log(error.message);
      }
    }

    fetchContacts();
  }, [initialContacts]);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(initialContacts));
  }, [initialContacts]);

  useEffect(() => {
    dispatch(filterContact(debouncedSearchTerm));
  }, [dispatch, debouncedSearchTerm]);

  function handleSubmit(ev) {
    ev.preventDefault();
    const form = ev.target;

    // console.log(newContact.name);
    // console.log(newContact.number);

    dispatch(addContact(newContact));

    form.reset();
  }

  function handleChange(e) {
    const { name, value } = e.target;

    if (value.length === 0) {
      // console.log('hey');

      setNewContact({ ...newContact, [name]: '' });
      setDisabled(true);
    }

    if (value.length > 0) {
      // console.log('hey');

      setNewContact({ ...newContact, [name]: value });
      setDisabled(false);
    }

    const isExist = initialContacts.find(contact => {
      // console.log(contact.name === value);
      return contact.name === value;
    });

    if (isExist) {
      // console.log('true');

      alert(`${value} este deja in contacte.`);
      setNewContact({ ...newContact, [name]: '' });
      setDisabled(true);
    }
  }

  function handleSearchChange(e) {
    const { value } = e.target;

    if (value.length > 0) {
      // console.log('hey');

      setSearchTherm(value);
    }

    if (value.length === 0) {
      // console.log('hey');

      setSearchTherm('');
    }
  }

  function handleRemove(id) {
    // console.log(id);
    dispatch(deleteContact(id));
  }

  let getContactsByName = [];

  if (
    initialContacts.includes(null) === false ||
    initialContacts !== undefined
  ) {
    // console.log(initialContacts);

    getContactsByName = initialContacts.filter(contact => {
      // console.log(contact);

      const isFound = contact.name.toLowerCase().includes(filter.toLowerCase());
      return isFound;
    });
  }

  return (
    <section className={styles.section}>
      <h1>Phonebook</h1>
      <Form handleSubmit={handleSubmit}>
        <Input
          type="text"
          name="name"
          label="Name"
          pattern="^[a-zA-Z]+(([' -][a-zA-Z ])?[a-zA-Z]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required={true}
          handleChange={handleChange}
        />

        <Input
          type="tel"
          name="number"
          label="Number"
          pattern="/(?:([+]d{1,4})[-.s]?)?(?:[(](d{1,3})[)][-.s]?)?(d{1,4})[-.s]?(d{1,4})[-.s]?(d{1,9})/g"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required={true}
          handleChange={handleChange}
        />

        <Button type="submit" disabled={disabled}>
          Add contact
        </Button>
      </Form>
      <div></div>{' '}
      <Input
        type="text"
        name="searchTherm"
        label="Find contacts by name"
        title="Type name"
        required={false}
        handleChange={handleSearchChange}
      />
      <div>
        <h2 style={{ margin: '10px 0 20px' }}>Contacts</h2>
        <p style={{ fontSize: '24px', margin: '0' }}>
          Total Contacts: {initialContacts.length}
        </p>
        <p style={{ fontSize: '24px', margin: '0' }}>
          Contacts found: {getContactsByName.length}
        </p>
      </div>
      {initialContacts.includes(null) === false && (
        <ul className={styles.contactList}>
          {getContactsByName.map(contact => {
            return (
              <li className={styles.contactItem} key={contact.id}>
                <span className={styles.span}></span>
                <span>
                  <b>{contact.name} :</b>
                </span>
                <span>
                  <b>{contact.number}</b>
                </span>
                <Button
                  variant={true}
                  type="button"
                  disabled={false}
                  handleClick={() => {
                    handleRemove(contact.id);
                  }}
                >
                  Delete
                </Button>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

ContactBook.propTypes = {
  disabled: PropTypes.bool,
  searchTherm: PropTypes.string,
  initialContacts: PropTypes.array,
};
