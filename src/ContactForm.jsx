import { useState } from 'react';
// Asigură-te că fișierul QuickNote.jsx chiar există în același folder!
// Dacă nu îl folosești încă, poți comenta linia de mai jos:
// import QuickNote from './QuickNote'; 

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
                onChange={(e) => setNume(e.target.value)} // AICI: era setName, am pus setNume
                style={{ padding: '8px', width: '100%', marginBottom: '10px' }}
            />
            <p><b>Nume introdus: </b> {nume}</p> {/* AICI: era note, am pus nume */}

            <input
                type="text"
                placeholder="Adauga email..."
                value={email} // AICI: era nume, am pus email
                onChange={(e) => setEmail(e.target.value)}
                style={{ padding: '8px', width: '100%', marginBottom: '10px' }}
            />
            <p><b>Email introdus: </b> {email}</p> {/* AICI: era note, am pus email */}
        </div>
    );
}

export default ContactForm; // Schimbă din QuickNote în ContactForm dacă acesta e fișierul principal