import s from './App.module.css'
import useLocaleStorage from './hooks/localeStorage';
import {useState, useEffect} from 'react';
import Contacts from "./Contacts/Contacts";
import Phonebook from "./Phonebook/Phonebook";
import shortid from "shortid";
import Filter from "./Filter";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import contactEl from './Contacts/contacts.json'



const App = () => {
  const [contacts, setContacts] = useLocaleStorage('contact', contactEl)
  const [filter, setFilter] = useState('');


  useEffect(() => {
    localStorage.setItem("contact", JSON.stringify(contacts));
  }, [contacts]);

  const filterChange = (e) => {
    setFilter(e.target.value)
  };

  const addContactCard = (values) => {
    const repeatName = contacts.find(contact => {
      return contact.name.toLowerCase() === values.name.toLowerCase()
    })
    if (repeatName) {
      Notify.warning(`${values.name} is already in contacts`)
      return
    }
    const contact = {
      id: shortid.generate(),
      name: values.name,
      number: values.number
    }
    setContacts(prev => {return [contact, ...prev] })
    values.name = ''
    values.number = ''
    Notify.success(`${values.name} is added in contacts`)
  };

  const deleteContactCard = (cardId) => {
    setContacts(prev => prev.filter((contact => contact.id !== cardId)))
  };

  const normalizedFilter = filter.toLowerCase();
  const visibleContactCards = contacts.filter( contact => contact.name.toLowerCase().includes(normalizedFilter))

  return (
    <section className={s.phonebookSection}>
      <Phonebook
        onAddContactCard={addContactCard} />
      <Filter onFilterChange={filterChange}
        value={filter}
      />
      <Contacts contacts={visibleContactCards}
        onDeleteContactCard={deleteContactCard}
      />
    </section>
  );
}
export default App;




//   componentDidUpdate(prevProps, prevState) {
//     const { contacts } = this.state;
//     if (contacts !== prevState.contacts) {
//       localStorage.setItem('contacts', JSON.stringify(contacts))
//     }
//   };
  
//   componentDidMount() {
//     const contacts = localStorage.getItem('contacts')
//     const parseContacts = JSON.parse(contacts)
//     if (!contacts) {
//       return
//     }
//     this.setState({ contacts: parseContacts })
//   };






  


  



