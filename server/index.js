const express = require('express');
const app = express();
const PORT = 3000;
app.use(express.json());

const projects = [
    { id: 1, title: "Pagina Personala", tech: "HTML, CSS", done: true },
    { id: 2, title: "Calculator Buget", tech: "JS", done: true },
    { id: 3, title: "Dashboard React", tech: "React", done: false },
    { id: 4, title: "API Meteo", tech: "React, API", done: false }
];


app.get('/', function (req, res) {
    res.json({ message: 'Serverul functioneaza!' });
});


app.get('/api/projects', function (req, res) {
    res.json(projects);
});


app.get('/api/stats', function (req, res) {
    const total = projects.length;
    const finalizate = projects.filter(p => p.done === true).length;
    const inLucru = total - finalizate;

    res.json({
        totalProiecte: total,
        proiecteFinalizate: finalizate,
        proiecteInLucru: inLucru
    });
});

app.get('/api/projects/:id', function (req, res) {
    const cautaId = parseInt(req.params.id);
    const proiectGasit = projects.find(p => p.id === cautaId);

    if (proiectGasit) {
        res.json(proiectGasit);
    } else {
        res.status(404).json({ error: 'Proiectul nu a fost gasit (404)' });
    }
});

app.post('/api/projects', function (req, res) {
    const proiectNou = req.body;

    if (!proiectNou.title) {
        return res.status(400).json({ error: 'Titlul este obligatoriu!' });
    }

    const nextId = projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1;
    proiectNou.id = nextId;

    if (proiectNou.done === undefined) {
        proiectNou.done = false;
    }

    projects.push(proiectNou);

    res.status(201).json(proiectNou);
});
app.delete('/api/projects/:id', function (req, res) {
    const idDeSters = parseInt(req.params.id);

    const index = projects.findIndex(p => p.id === idDeSters);

    if (index === -1) {
        return res.status(404).json({ error: 'Proiectul nu a fost gasit pentru stergere!' });
    }

    projects.splice(index, 1);

    res.json({ message: `Proiectul cu ID-ul ${idDeSters} a fost sters cu succes!` });
});
app.listen(PORT, function () {
    console.log(`\n======================================`);
    console.log(`🚀 Serverul a pornit cu succes!`);
    console.log(`======================================`);
    console.log(`Poti accesa (tine apasat Ctrl si da Click):`);
    console.log(`- Pagina de start:  http://localhost:${PORT}`);
    console.log(`- Toate proiectele: http://localhost:${PORT}/api/projects`);
    console.log(`- Proiectul nr. 1:  http://localhost:${PORT}/api/projects/1`);
    console.log(`- Statistici:       http://localhost:${PORT}/api/stats`);
    console.log(`======================================\n`);
});