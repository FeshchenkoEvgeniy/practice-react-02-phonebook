import PropTypes from 'prop-types';

export const ContactList = ({ getVisibleContacts, deleteContact }) => {
  return (
    <ul>
      {getVisibleContacts().map(({ id, name, number }) => (
        <li key={id}>
          {name}: {number}
          <button type="button" onClick={() => deleteContact(id)}>
            delete
          </button>
        </li>
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  getVisibleContacts: PropTypes.func.isRequired,
  deleteContact: PropTypes.func.isRequired,
};
