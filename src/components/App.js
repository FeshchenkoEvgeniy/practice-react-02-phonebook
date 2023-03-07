import React, { Component } from 'react';
import { nanoid } from 'nanoid';

class App extends Component {
  nameId = nanoid();
  numberId = nanoid();
  filterId = nanoid();
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    name: '',
    number: '',
    filter: '',
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const {
      elements: { name, number },
    } = evt.currentTarget;

    const contact = {
      id: nanoid(),
      name: name.value,
      number: number.value,
    };

    this.setState({
      contacts: [contact, ...this.state.contacts],
    });
  };

  changeFilter = evt => {
    this.setState({ filter: evt.currentTarget.value });
  };

  getVisibleTodos = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const { filter } = this.state;
    const visibleContacts = this.getVisibleTodos();
    return (
      <div>
        <form
          onSubmit={this.handleSubmit}
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <label htmlFor={this.nameId}>
            Name
            <input
              type="text"
              name="name"
              id={this.nameId}
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
            />
          </label>
          <label htmlFor={this.numberId}>
            Number
            <input
              type="tel"
              name="number"
              id={this.numberId}
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
            />
          </label>
          <button type="submit" style={{ width: '200px' }}>
            Add contact
          </button>
        </form>
        <h2>Contacts</h2>
        <label htmlFor={this.filterId}>
          Find Contacts by name
          <input
            type="text"
            name="filter"
            id={this.filterId}
            value={filter}
            onChange={this.changeFilter}
          />
        </label>
        <ul>
          {visibleContacts.map(({ id, name, number }) => (
            <li key={id}>
              {name} {number}
              <button type="button" onClick={() => this.deleteContact(id)}>
                delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
