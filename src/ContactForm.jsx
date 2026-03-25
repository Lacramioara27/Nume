import { useState } from 'react';

function ContactForm() {
    const [nume, setNume] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
 return (
        <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', margin: '10px 0' }}>
            <h3>Exercitiul 4: Formular de contact</h3>
        <input
        type="text"
         placeholder="Adauga numele..."
         value={nume}  
             onChange={(e) => setName(e.target.value)}
                style={{ padding: '8px', width: '100%', marginBottom: '10px' }}
            />
            <p><b>Nume introdus: </b> {note}</p>
        </div>
    );
}

export default QuickNote;