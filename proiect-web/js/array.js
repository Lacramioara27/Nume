
const eduElements = document.querySelectorAll('#education ol li');
const eduArray = Array.from(eduElements).map(li => li.textContent.trim());
console.log("1. Lista educație:", eduArray);


const filtru2024 = eduArray.filter(item => item.includes("2024"));
console.log("2. Filtru 2024:", filtru2024);


const primeleCuvinte = eduArray.map(item => item.split(' ')[0]);
console.log("3. Primul cuvânt:", primeleCuvinte);


const proiecte = [
    { name: "Proiect 1", tech: "HTML", done: true },
    { name: "Proiect 2", tech: "CSS", done: true },
    { name: "Proiect 3", tech: "JS", done: false },
    { name: "Proiect 4", tech: "JSON", done: false }
];

const container = document.getElementById('projects');
if (container) {
    container.innerHTML = `
        <h2>Proiecte</h2>
        <ul>${proiecte.map(p => `<li>${p.name} (${p.tech})</li>`).join('')}</ul>
        <p>Finalizate: ${proiecte.filter(p => p.done).length} din ${proiecte.length}</p>
    `;
}
// Ex 4. Calcul număr total ani de studiu folosind reduce()
const totalAni = eduArray.reduce((acumulator, element) => {
    // Extragem cifrele (anii) folosind parseInt conform cheatsheet-ului 
    const aniGasiti = element.match(/\d+/g);

    if (aniGasiti && aniGasiti.length >= 1) {
        const anInceput = parseInt(aniGasiti[0]);
        let anSfarsit;

        // Logica pentru studiile în curs (Licență 2024 - Prezent)
        if (element.toLowerCase().includes("prezent")) {
            anSfarsit = 2026; // Anul curent pentru calcul exact
        } else if (aniGasiti.length >= 2) {
            anSfarsit = parseInt(aniGasiti[1]);
        } else {
            anSfarsit = anInceput;
        }

        const durata = anSfarsit - anInceput;
        return acumulator + durata; // Adunăm durata la total 
    }
    return acumulator;
}, 0);

console.log("Total ani de studiu: " + totalAni);