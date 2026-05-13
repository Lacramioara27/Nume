import { useState, useEffect } from 'react';

function ProjectList() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');

    // State-uri pentru formularul de adăugare
    const [title, setTitle] = useState('');
    const [tech, setTech] = useState('');

    // 1. Încărcarea datelor (GET)
    useEffect(() => {
        fetch('http://localhost:3000/api/projects')
            .then(res => {
                if (!res.ok) throw new Error("Eroare la server");
                return res.json();
            })
            .then(data => {
                setProjects(data);
                setLoading(false);
            })
            .catch(err => {
                setError('Nu am putut încărca proiectele. Verifică dacă serverul e pornit!');
                setLoading(false);
            });
    }, []);

    // 2. Adăugarea unui proiect (POST)
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/api/projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, tech })
            });

            if (response.ok) {
                const newProject = await response.json();
                setProjects([...projects, newProject]); // Îl adăugăm în listă
                setTitle(''); // Resetăm câmpurile
                setTech('');
            }
        } catch (err) {
            console.error('Eroare la trimitere:', err);
        }
    };

    // 3. Ștergerea unui proiect (DELETE)
const handleDelete = async (id) => {
    try {
        const response = await fetch(`http://localhost:3000/api/projects/${id}`, {
            method: 'DELETE'
        });

        // Verificăm dacă serverul a zis "OK" (status 200)
        if (response.ok) {
            // DOAR ACUM scoatem proiectul din starea locală (UI)
            setProjects(prevProjects => prevProjects.filter(p => p._id !== id)); 
            console.log("Proiect șters cu succes din server și UI");
        } else {
            alert("Serverul a primit cererea, dar a apărut o eroare la ștergere.");
        }
    } catch (err) {
        console.error('Eroare de rețea:', err);
    }
};

    // 4. Filtrarea pentru căutare
    const filtered = projects.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) return <p>Se încarcă proiectele...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', textAlign: 'left' }}>
            <h2 style={{ color: '#D23175' }}>Management Proiecte</h2>

            {/* Formular Adăugare */}
            <div style={{ marginBottom: '30px', padding: '15px', border: '1px solid #333', borderRadius: '8px' }}>
                <h4>Adaugă Proiect Nou</h4>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <input 
                        type="text" 
                        placeholder="Nume Proiect" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        required 
                        style={{ padding: '8px', background: '#222', color: 'white', border: '1px solid #444' }}
                    />
                    <input 
                        type="text" 
                        placeholder="Tehnologii (ex: React, MongoDB)" 
                        value={tech} 
                        onChange={(e) => setTech(e.target.value)} 
                        required 
                        style={{ padding: '8px', background: '#222', color: 'white', border: '1px solid #444' }}
                    />
                    <button type="submit" style={{ background: '#D23175', color: 'white', border: 'none', padding: '10px', cursor: 'pointer', fontWeight: 'bold' }}>
                        SALVEAZĂ PROIECT
                    </button>
                </form>
            </div>

            {/* Căutare și Listă */}
            <input
                type="text"
                placeholder="Caută în listă..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ width: '100%', padding: '10px', marginBottom: '20px', background: '#111', color: 'white', border: '1px solid #D23175' }}
            />

            <ul style={{ listStyle: 'none', padding: 0 }}>
                {filtered.map(p => (
                    <li key={p._id} style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center', 
                        padding: '10px', 
                        borderBottom: '1px solid #333' 
                    }}>
                        <div>
                            <strong>{p.title}</strong>
                            <div style={{ fontSize: '0.8em', color: '#aaa' }}>{p.tech}</div>
                        </div>
                        <button 
                            onClick={() => handleDelete(p._id)}
                            style={{ background: 'none', border: '1px solid #D23175', color: '#D23175', cursor: 'pointer', padding: '5px 10px' }}
                        >
                            Șterge
                        </button>
                    </li>
                ))}
            </ul>
            {filtered.length === 0 && <p>Nu s-a găsit niciun proiect.</p>}
        </div>
    );
}

export default ProjectList;