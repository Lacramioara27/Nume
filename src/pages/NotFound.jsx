import { Link } from 'react-router';

function NotFound() {
    return (
        <section className="page-card">
            <div className="page-heading">
                <p className="eyebrow">Eroare</p>
                <h2>404 — Pagina nu există</h2>
                <p>Adresa accesată nu corespunde niciunei pagini din aplicație.</p>
            </div>

            <Link className="berry-link-button" to="/">
                Înapoi la Home
            </Link>
        </section>
    );
}

export default NotFound;