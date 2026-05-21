import { useState } from 'react';

function QuickNote() {
    const [note, setNote] = useState('');

    return (
        <section className="widget-card">
            <h3>Notă rapidă</h3>

            <input
                className="berry-input"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Scrie o notă..."
            />

            <p className="note-preview">
                Ai scris: <span>{note || 'nimic încă'}</span>
            </p>
        </section>
    );
}

export default QuickNote;