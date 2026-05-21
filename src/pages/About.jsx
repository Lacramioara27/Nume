function About() {
    return (
        <section className="page-card">
            <div className="page-heading">
                <p className="eyebrow">Despre proiect</p>
                <h2>About</h2>
            </div>

            <div className="text-panel">
                <p>
                    Această aplicație este un dashboard personal realizat pentru laboratoarele
                    de Programare Web.
                </p>

                <p>
                    Proiectul folosește React pentru interfață, React Router pentru navigare,
                    Express pentru backend și MongoDB pentru stocarea proiectelor.
                </p>

                <p>
                    Aplicația include componente, props, state, formulare controlate, fetch,
                    loading, error handling, rutare, CRUD complet și stilizare personalizată.
                </p>
            </div>
        </section>
    );
}

export default About;