const express = require('express');
const app = express();
const PORT = 3000;

const cors = require('cors'); 
app.use(cors()); // [cite: 17]
app.use(express.json()); // Foarte important pentru POST

// Folosim 'let' pentru că lista se va modifica la ștergere
let projects = [
    { _id: "1", title: "Pagina Personala", tech: "HTML, CSS", done: true },
    { _id: "2", title: "Calculator Buget", tech: "JS", done: true },
    { _id: "3", title: "Dashboard React", tech: "React", done: false },
    { _id: "4", title: "API Meteo", tech: "React, API", done: false }
];

app.get('/', (req, res) => {
    res.json({ message: 'Serverul functioneaza!' });
});

// Exercițiul 2: Citirea proiectelor [cite: 21]
app.get('/api/projects', (req, res) => {
    res.json(projects);
});

// Exercițiul 4: Adăugarea unui proiect [cite: 51]
app.post('/api/projects', (req, res) => {
    const proiectNou = req.body;
    if (!proiectNou.title) {
        return res.status(400).json({ error: 'Titlul este obligatoriu!' });
    }
    // Generăm un ID unic
    proiectNou._id = Date.now().toString();
    proiectNou.done = false;
    
    projects.push(proiectNou);
    res.status(201).json(proiectNou);
});

// Exercițiul 5: Ștergerea unui proiect (CORRECTATĂ) [cite: 75]
app.delete('/api/projects/:id', (req, res) => {
    const { id } = req.params;
    
    // Căutăm dacă există proiectul cu acest _id
    const initialLength = projects.length;
    projects = projects.filter(p => p._id !== id);

    if (projects.length < initialLength) {
        // Dacă am șters ceva, trimitem succes 
        res.status(200).json({ message: "Proiectul a fost șters" });
    } else {
        res.status(404).json({ error: "Proiectul nu a fost găsit" });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server pornit pe http://localhost:${PORT}`);
});