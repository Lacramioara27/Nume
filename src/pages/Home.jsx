import { useEffect, useState } from 'react';
import QuickNote from '../QuickNote';
import TodoList from '../TodoList';

function Home() {
    const [count, setCount] = useState(0);
    const [stats, setStats] = useState({
        total: 0,
        done: 0,
        inProgress: 0,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(function () {
        fetch('http://localhost:3000/api/stats')
            .then(function (response) {
                if (!response.ok) {
                    throw new Error('Eroare la preluarea statisticilor');
                }

                return response.json();
            })
            .then(function (data) {
                setStats(data);
                setLoading(false);
            })
            .catch(function (err) {
                console.error('Eroare statistici:', err);
                setError('Statisticile nu pot fi încărcate. Verifică dacă serverul Express rulează.');
                setLoading(false);
            });
    }, []);

    return (
        <section className="page-card">
            <div className="hero-section">
                <p className="eyebrow">Programare Web</p>
                <h2>Bună! Asta este pagina mea</h2>
                <p className="student-name">Curcuta Lăcrămioara Georgiana</p>
                <p className="hero-text">
                    Dashboard personal realizat cu React, React Router, Express și MongoDB.
                </p>
            </div>

            <section className="stats-section">
                <h3>Dashboard proiecte live</h3>

                {loading && <p className="muted-text">Se încarcă statisticile...</p>}

                {!loading && error && <p className="error-message">{error}</p>}

                {!loading && !error && (
                    <div className="stats-grid">
                        <div className="stat-card">
                            <span>{stats.total}</span>
                            <p>Total proiecte</p>
                        </div>

                        <div className="stat-card stat-done">
                            <span>{stats.done}</span>
                            <p>Finalizate</p>
                        </div>

                        <div className="stat-card stat-progress">
                            <span>{stats.inProgress}</span>
                            <p>În lucru</p>
                        </div>
                    </div>
                )}
            </section>

            <section className="counter-card">
                <h3>Contor React</h3>
                <p>
                    Ai apăsat de <span>{count}</span> ori
                </p>

                <div className="button-row">
                    <button className="berry-button" onClick={() => setCount(count + 1)}>
                        +1
                    </button>
                    <button className="secondary-button" onClick={() => setCount(count - 1)}>
                        -1
                    </button>
                    <button className="ghost-button" onClick={() => setCount(0)}>
                        Reset
                    </button>
                </div>
            </section>

            <section className="home-widgets">
                <TodoList />
                <QuickNote />
            </section>
        </section>
    );
}

export default Home;