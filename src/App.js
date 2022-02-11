import s from './App.module.css';
import useLocaleStorage from './hooks/localeStorage';
import { useState, useEffect } from 'react';
import Contacts from './components/Contacts/Contacts';
import Phonebook from './components/Phonebook/Phonebook';
import shortid from 'shortid';
import Filter from './components/Filter';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import contactEl from './components/Contacts/contacts.json';

const App = () => {
  const [contacts, setContacts] = useLocaleStorage('contact', contactEl);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contact', JSON.stringify(contacts));
  }, [contacts]);

  const filterChange = e => {
    setFilter(e.target.value);
  };

  const addContactCard = ({ name, number }) => {
    const repeatName = contacts.find(contact => {
      return contact.name.toLowerCase() === name.toLowerCase();
    });
    if (repeatName) {
      Notify.warning(`${name} is already in contacts`);
      return;
    }
    const contact = {
      id: shortid.generate(),
      name,
      number,
    };
    setContacts(prev => {
      return [contact, ...prev];
    });

    Notify.success(`${name} is added in contacts`);
  };

  const deleteContactCard = cardId => {
    setContacts(prev => prev.filter(contact => contact.id !== cardId));
  };

  const normalizedFilter = filter.toLowerCase();
  const visibleContactCards = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter),
  );

  return (
    <section className={s.phonebookSection}>
      <Phonebook onAddContactCard={addContactCard} />
      <Filter onFilterChange={filterChange} value={filter} />
      <Contacts
        contacts={visibleContactCards}
        onDeleteContactCard={deleteContactCard}
      />
    </section>
  );
};
export default App;
