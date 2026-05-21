import ProjectList from '../ProjectList';

function Projects() {
    return (
        <section className="page-card">
            <div className="page-heading">
                <p className="eyebrow">CRUD complet</p>
                <h2>Gestionare proiecte</h2>
                <p>
                    Aici poți vedea, adăuga, edita, finaliza, filtra și șterge proiectele
                    salvate în baza de date.
                </p>
            </div>

            <ProjectList />
        </section>
    );
}

export default Projects;