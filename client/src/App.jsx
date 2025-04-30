import { useState } from 'react';

function App() {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [editId, setEditId] = useState(null);
  const [idCounter, setIdCounter] = useState(1); // simple ID counter

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !phone) return;

    if (editId !== null) {
      setContacts(prev =>
        prev.map(contact =>
          contact.id === editId ? { ...contact, name, phone } : contact
        )
      );
      setEditId(null);
    } else {
      setContacts([...contacts, { id: idCounter, name, phone }]);
      setIdCounter(prev => prev + 1);
    }

    setName('');
    setPhone('');
  };

  const handleEdit = (id) => {
    const contact = contacts.find(c => c.id === id);
    if (contact) {
      setName(contact.name);
      setPhone(contact.phone);
      setEditId(id);
    }
  };

  const handleDelete = (id) => {
    setContacts(prev => prev.filter(c => c.id !== id));
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Contact Manager</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          placeholder="Phone"
          value={phone}
          onChange={e => setPhone(e.target.value)}
        />
        <button type="submit">{editId !== null ? 'Update' : 'Add'} Contact</button>
      </form>

      <ul>
        {contacts.map(contact => (
          <li key={contact.id}>
            {contact.name} – {contact.phone}
            <button onClick={() => handleEdit(contact.id)}>Edit</button>
            <button onClick={() => handleDelete(contact.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
