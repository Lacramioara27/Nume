import { useState } from 'react';

function ContactForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [feedback, setFeedback] = useState('');

    function handleSubmit(e) {
        e.preventDefault();

        if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
            setFeedback('Completează toate câmpurile înainte de trimitere.');
            return;
        }

        setFeedback(`Mulțumesc, ${name}! Mesajul tău a fost înregistrat.`);
        setName('');
        setEmail('');
        setMessage('');
    }

    return (
        <form className="contact-form" onSubmit={handleSubmit}>
            <label>
                Nume
                <input
                    className="berry-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Numele tău"
                />
            </label>

            <label>
                Email
                <input
                    className="berry-input"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@example.com"
                />
            </label>

            <label>
                Mesaj
                <textarea
                    className="berry-textarea"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Scrie mesajul..."
                />
            </label>

            <button className="berry-button" type="submit">
                Trimite
            </button>

            {feedback && <p className="form-feedback">{feedback}</p>}
        </form>
    );
}

export default ContactForm;