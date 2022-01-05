import { BsFillTelephonePlusFill } from "react-icons/bs";
import { IconContext } from "react-icons";
import s from './Phonebook.module.css'
import { useState } from "react";

   
const Phonebook = ({onAddContactCard}) => {

    const [name, setName] = useState('');
    const [number, setNumber] = useState('');

    const handleChange = e => {
        const { name, value } = e.target
        
        switch (name) {
            case "name":
                setName(value)
                break;
            case "number":
                setNumber(value)
                break;
            default:
                return;
            
        };
    }

    const formSubmit = (e) => {
        e.preventDefault()
        onAddContactCard({ name, number })
        setNumber('')
        setName('')
    };

    return (
        <>
            <h2 className={s.phonebookTitle}>Phonebook
                <IconContext.Provider value={{ color: "rgb(198, 131, 204)", size: "25px", style: { margin: "0 0 0 15px" } }}>
                    <BsFillTelephonePlusFill />
                </IconContext.Provider></h2>
            <form className={s.phonebookForm} onSubmit={formSubmit} >
                <div className={s.inputBox}>                            <label className={s.label}>Name</label>
                    <input className={s.input} value={name} onChange={handleChange}
                        type="text"
                        name="name"
                        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                        title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
                        required
                    />
                </div>
                <div className={s.inputBox}>
                    <label className={s.label}>Number</label>
                    <input className={s.input} value={number} onChange={handleChange}
                        type="tel"
                        name="number"
                        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                        title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
                        required
                    />
                </div>
                <div className={s.buttonBox}>
                    <button className={s.deleteButton} type="submit">Add contact</button>
                </div>
            </form>
        </>
    )
};

    
export default Phonebook