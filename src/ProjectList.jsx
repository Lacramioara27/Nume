import { useState, useEffect } from 'react';

function ProjectList() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState(''); 

    useEffect(function () {
        fetch('/data/projects.json') 
            .then(res => {
                if (!res.ok) throw new Error();
                return res.json();
            })
            .then(data => {
                setProjects(data.projects);
                setLoading(false);
            })
            .catch(() => {
                setError('Eroare la încărcarea datelor'); 
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Se incarca...</p>;
    if (error) return <p>{error}</p>;

    
    const filtered = projects.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase())
    );

   
    const total = projects.length;
    const done = projects.filter(p => p.done).length;
    const todo = projects.filter(p => !p.done).length;

    return (
        <div>
            <h3>Lista Proiecte</h3>


            <input
                type="text"
                placeholder="Cauta un proiect..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <ul>
                {filtered.map(p => (
                    <li key={p.id}>
                        {p.title} - {p.tech} {p.done}
                    </li>
                ))}
            </ul>
            <div style={{ marginTop: '20px', borderTop: '1px solid #ccc' }}>
                <p>Total proiecte: {total}</p> 
                <p>Finalizate: {done}</p> 
                <p>În lucru: {todo}</p>
            </div>
        </div>
    );
}

export default ProjectList;