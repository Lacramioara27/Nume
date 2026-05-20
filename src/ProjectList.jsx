import { useState, useEffect } from 'react';

function ProjectList() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');

    // State-uri pentru filtrare și sortare (Exercițiul 6 - Bonus)
    const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'done', 'inProgress'
    const [sortBy, setSortBy] = useState('id'); // 'id' (cronologic), 'title'

    // State-uri pentru formularul de adăugare
    const [title, setTitle] = useState('');
    const [tech, setTech] = useState('');

    // State-uri pentru modul de editare (Exercițiul 2)
    const [editingId, setEditingId] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editTech, setEditTech] = useState('');

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

    // 3. Ștergerea unui proiect cu Confirmare (DELETE - Exercițiul 3)
    const handleDelete = async (id) => {
        if (!window.confirm('Sigur doriți să ștergeți acest proiect?')) {
            return; // Oprim execuția dacă utilizatorul apasă "Cancel"
        }

        try {
            const response = await fetch(`http://localhost:3000/api/projects/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                setProjects(prevProjects => prevProjects.filter(p => p._id !== id));
                console.log("Proiect șters cu succes din server și UI");
            } else {
                alert("Serverul a primit cererea, dar a apărut o eroare la ștergere.");
            }
        } catch (err) {
            console.error('Eroare de rețea:', err);
        }
    };

    // 4. Toggle Status Done / In Progress (PUT - Exercițiul 1)
    const handleToggle = async (id, currentDone) => {
        try {
            const response = await fetch(`http://localhost:3000/api/projects/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ done: !currentDone })
            });

            if (response.ok) {
                const updatedProject = await response.json();
                // Înlocuim proiectul vechi cu cel actualizat primit de la server
                setProjects(projects.map(p => p._id === id ? updatedProject : p));
            }
        } catch (err) {
            console.error('Eroare la schimbarea statusului:', err);
        }
    };

    // 5. Activarea modului de editare pentru un proiect (Exercițiul 2)
    const startEditing = (project) => {
        setEditingId(project._id);
        setEditTitle(project.title);
        setEditTech(project.tech);
    };

    // 6. Salvarea modificărilor proiectului editat (PUT - Exercițiul 2)
    const handleSaveEdit = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/api/projects/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: editTitle, tech: editTech })
            });

            if (response.ok) {
                const updatedProject = await response.json();
                setProjects(projects.map(p => p._id === id ? updatedProject : p));
                setEditingId(null); // Închidem formularul de editare
            }
        } catch (err) {
            console.error('Eroare la salvarea editării:', err);
        }
    };

    const processedProjects = projects
        .filter(p => p.title.toLowerCase().includes(search.toLowerCase()))
        .filter(p => {
            if (statusFilter === 'done') return p.done === true;
            if (statusFilter === 'inProgress') return p.done === false;
            return true; 
        })
       
        .sort((a, b) => {
            if (sortBy === 'title') {
                return a.title.localeCompare(b.title); 
            }
            return a._id.localeCompare(b._id); 
        });

    if (loading) return <p>Se încarcă proiectele...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div style={{ padding: '20px', maxWidth: '650px', margin: '0 auto', textAlign: 'left' }}>
            <h2 style={{ color: '#D23175' }}>Management Proiecte</h2>

            <div style={{ marginBottom: '30px', padding: '15px', border: '1px solid #333', borderRadius: '8px', background: '#1a1a1a' }}>
                <h4 style={{ margin: '0 0 10px 0' }}>Adaugă Proiect Nou</h4>
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
                    <button type="submit" style={{ background: '#28a745', color: 'white', border: 'none', padding: '10px', cursor: 'pointer', fontWeight: 'bold' }}>
                        SALVEAZĂ PROIECT
                    </button>
                </form>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="Caută în listă..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{ width: '100%', padding: '10px', background: '#111', color: 'white', border: '1px solid #D23175', boxSizing: 'border-box' }}
                />

                <div style={{ display: 'flex', gap: '10px' }}>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        style={{ flex: 1, padding: '8px', background: '#222', color: 'white', border: '1px solid #444' }}
                    >
                        <option value="all">Toate statusurile</option>
                        <option value="done">Finalizate</option>
                        <option value="inProgress">În lucru</option>
                    </select>

                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        style={{ flex: 1, padding: '8px', background: '#222', color: 'white', border: '1px solid #444' }}
                    >
                        <option value="id">Ordonează: Dată adăugare</option>
                        <option value="title">Ordonează: Alfabetic titlu</option>
                    </select>
                </div>
            </div>

            <ul style={{ listStyle: 'none', padding: 0 }}>
                {processedProjects.map(p => {
                    const isEditing = editingId === p._id;

                    return (
                        <li key={p._id} style={{
                            padding: '15px',
                            marginBottom: '10px',
                            borderRadius: '6px',
                            border: '1px solid #333',
                            background: p.done ? '#142917' : '#222', 
                            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                            transition: 'transform 0.2s',
                        }}>
                            {isEditing ? (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    <input
                                        type="text"
                                        value={editTitle}
                                        onChange={(e) => setEditTitle(e.target.value)}
                                        style={{ padding: '6px', background: '#333', color: 'white', border: '1px solid #555' }}
                                    />
                                    <input
                                        type="text"
                                        value={editTech}
                                        onChange={(e) => setEditTech(e.target.value)}
                                        style={{ padding: '6px', background: '#333', color: 'white', border: '1px solid #555' }}
                                    />
                                    <div style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
                                        <button
                                            onClick={() => handleSaveEdit(p._id)}
                                            style={{ background: '#28a745', color: 'white', border: 'none', padding: '5px 12px', cursor: 'pointer' }}
                                        >
                                            Salvează
                                        </button>
                                        <button
                                            onClick={() => setEditingId(null)}
                                            style={{ background: '#6c757d', color: 'white', border: 'none', padding: '5px 12px', cursor: 'pointer' }}
                                        >
                                            Anulează
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <strong style={{ fontSize: '1.1em', textDecoration: p.done ? 'line-through' : 'none', color: p.done ? '#88c999' : 'white' }}>
                                            {p.title} {p.done && '✓'}
                                        </strong>
                                        <div style={{ fontSize: '0.85em', color: '#aaa', marginTop: '3px' }}>Tehnologii: {p.tech}</div>
                                        <span style={{
                                            display: 'inline-block',
                                            fontSize: '0.75em',
                                            padding: '2px 6px',
                                            borderRadius: '4px',
                                            marginTop: '5px',
                                                background: p.done ? '#28a745' : '#ff0e8b',
                                            color: p.done ? 'white' : 'white'
                                        }}>
                                            {p.done ? 'Finalizat' : 'În lucru'}
                                        </span>
                                    </div>

                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <button
                                            onClick={() => handleToggle(p._id, p.done)}
                                                style={{ background: p.done ? '#ff0e8b' : '#28a745', color : 'white', border: 'none', cursor: 'pointer', padding: '6px 10px', borderRadius: '4px', fontWeight: '500' }}
                                        >
                                            {p.done ? 'Reia proiect' : 'Finalizează'}
                                        </button>
                                        <button
                                            onClick={() => startEditing(p)}
                                            style={{ background: '#007bff', color: 'white', border: 'none', cursor: 'pointer', padding: '6px 10px', borderRadius: '4px' }}
                                        >
                                            Editează
                                        </button>
                                        <button
                                            onClick={() => handleDelete(p._id)}
                                            style={{ background: '#dc3545', color: 'white', border: 'none', cursor: 'pointer', padding: '6px 10px', borderRadius: '4px' }}
                                        >
                                            Șterge
                                        </button>
                                    </div>
                                </div>
                            )}
                        </li>
                    );
                })}
            </ul>
            {processedProjects.length === 0 && <p style={{ color: '#aaa' }}>Nu s-a găsit niciun proiect conform filtrelor.</p>}
        </div>
    );
}

export default ProjectList;