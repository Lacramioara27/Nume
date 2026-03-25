import { useState } from 'react';

function QuickNote() {
    const [note, setNote] = useState('');

    return (
        <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', margin: '10px 0' }}>
            <h3>Exercitiul 1: Nota rapida</h3>
            <input
                type="text"
                placeholder="Scrie o notă..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                style={{ padding: '8px', width: '100%', marginBottom: '10px' }}
            />
            <p><b>Continut nota:</b> {note}</p>
        </div>
    );
}

export default QuickNote;