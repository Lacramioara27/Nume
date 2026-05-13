import { useState } from 'react';
import ProjectList from '../ProjectList';

function Projects() {
    const [title, setTitle] = useState('');
    const [tech, setTech] = useState('');

    // Funcția pentru adăugare proiect (POST) - Lab 10 Ex 4
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:3000/api/projects', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, tech })
        });
        if (response.ok) {
            window.location.reload(); // Reîncărcăm pentru a vedea noul proiect
        }
    };

    return (
        <div>
            <h1 className="header-main-title">Gestionare Proiecte</h1>
            <div className="projects-layout">
                {/* LISTA ÎN STÂNGA */}
                <div className="projects-sidebar">
                    <ProjectList />
                </div>

                {/* FORMULARUL ÎN DREAPTA */}
                <div className="projects-content">
                    <h3 style={{ color: '#D23175' }}>Adaugă Proiect Nou</h3>
                    <form onSubmit={handleSubmit}>
                        <input 
                            className="berry-input"
                            placeholder="Numele Proiectului" 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)} 
                        />
                        <input 
                            className="berry-input"
                            placeholder="Tehnologia folosită" 
                            value={tech} 
                            onChange={(e) => setTech(e.target.value)} 
                        />
                        <button type="submit" className="berry-button">Salvează în Baza de Date</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Projects;