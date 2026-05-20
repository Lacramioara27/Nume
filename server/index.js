const express = require('express');
const app = express();
const PORT = 3000;

const cors = require('cors');
app.use(cors());
app.use(express.json());

let projects = [
    { _id: "1", title: "Pagina Personala", tech: "HTML, CSS", done: true },
    { _id: "2", title: "Calculator Buget", tech: "JS", done: true },
    { _id: "3", title: "Dashboard React", tech: "React", done: false },
    { _id: "4", title: "API Meteo", tech: "React, API", done: false }
];

app.get('/', (req, res) => {
    res.json({ message: 'Serverul functioneaza!' });
});

app.get('/api/projects', (req, res) => {
    res.json(projects);
});

app.post('/api/projects', (req, res) => {
    const proiectNou = req.body;
    if (!proiectNou.title) {
        return res.status(400).json({ error: 'Titlul este obligatoriu!' });
    }

    proiectNou._id = Date.now().toString();
    proiectNou.done = false;

    projects.push(proiectNou);
    res.status(201).json(proiectNou);
});

app.delete('/api/projects/:id', (req, res) => {
    const { id } = req.params;

    const initialLength = projects.length;
    projects = projects.filter(p => p._id !== id);

    if (projects.length < initialLength) {
        res.status(200).json({ message: "Proiectul a fost șters" });
    } else {
        res.status(404).json({ error: "Proiectul nu a fost găsit" });
    }
});

// ==========================================
// ADAUGAT PENTRU LABORATORUL 11
// ==========================================

// Exercițiul 1 & 2: Rută PUT pentru actualizare proiect (Toggle status și Editare detalii)
app.put('/api/projects/:id', (req, res) => {
    const { id } = req.params;
    const { title, tech, done } = req.body; // Preluăm datele trimise din frontend

    // Căutăm proiectul în array
    const projectIndex = projects.findIndex(p => p._id === id);

    if (projectIndex !== -1) {
        // Actualizăm doar câmpurile care au fost trimise în request body
        if (title !== undefined) projects[projectIndex].title = title;
        if (tech !== undefined) projects[projectIndex].tech = tech;
        if (done !== undefined) projects[projectIndex].done = done;

        // Returnăm proiectul modificat înapoi la frontend
        res.json(projects[projectIndex]);
    } else {
        res.status(404).json({ error: "Proiectul nu a fost găsit pentru actualizare" });
    }
});

// Exercițiul 4: Rută GET pentru statistici live
app.get('/api/stats', (req, res) => {
    const total = projects.length; // Numărul total de proiecte
    const done = projects.filter(p => p.done === true).length; // Numărul celor finalizate
    const inProgress = total - done; // Numărul celor în lucru

    res.json({
        total: total,
        done: done,
        inProgress: inProgress
    });
});
// ==========================================

app.listen(PORT, () => {
    console.log(`🚀 Server pornit pe http://localhost:${PORT}`);
});