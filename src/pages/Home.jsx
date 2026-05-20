import { useState, useEffect } from 'react';

function Home() {
    // State pentru stocarea statisticilor primite de la server
    const [stats, setStats] = useState({ total: 0, done: 0, inProgress: 0 });
    const [loading, setLoading] = useState(true);

    // Încărcăm statisticile live la randarea paginii
    useEffect(() => {
        fetch('http://localhost:3000/api/stats')
            .then(res => {
                if (!res.ok) throw new Error("Eroare la preluarea statisticilor");
                return res.json();
            })
            .then(data => {
                setStats(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Eroare statistici:", err);
                setLoading(false);
            });
    }, []);

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ color: '#D23175', marginBottom: '5px' }}>Bună! Asta este pagina mea</h2>
            <p style={{ fontSize: '1.2em', fontWeight: '500', color: '#aaa', marginBottom: '30px' }}>
                Curcuta Lăcrămioara Georgiana
            </p>

            {/* Secțiunea de Statistici Live (Exercițiul 4 & 5) */}
            <div style={{ background: '#1a1a1a', padding: '20px', borderRadius: '10px', border: '1px solid #333' }}>
                <h3 style={{ marginTop: 0, color: '#fff', borderBottom: '1px solid #333', paddingBottom: '10px' }}>
                    📊 Dashboard Proiecte (Live)
                </h3>

                {loading ? (
                    <p style={{ color: '#aaa' }}>Se încarcă statisticile...</p>
                ) : (
                    <div style={{ display: 'flex', justifyContent: 'space-around', gap: '15px', marginTop: '20px' }}>
                        {/* Card Total */}
                        <div style={{
                            flex: 1,
                            padding: '15px',
                            background: '#222',
                            borderRadius: '8px',
                            border: '1px solid #444',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.2)'
                        }}>
                            <div style={{ fontSize: '1.8em', fontWeight: 'bold', color: '#007bff' }}>{stats.total}</div>
                            <div style={{ fontSize: '0.85em', color: '#aaa', marginTop: '5px' }}>Total Proiecte</div>
                        </div>

                        {/* Card Finalizate */}
                        <div style={{
                            flex: 1,
                            padding: '15px',
                            background: '#142917',
                            borderRadius: '8px',
                            border: '1px solid #28a745',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.2)'
                        }}>
                            <div style={{ fontSize: '1.8em', fontWeight: 'bold', color: '#28a745' }}>{stats.done}</div>
                            <div style={{ fontSize: '0.85em', color: '#aaa', marginTop: '5px' }}>Finalizate</div>
                        </div>

                        {/* Card În Lucru */}
                        <div style={{
                            flex: 1,
                            padding: '15px',
                            background: '#2d2410',
                            borderRadius: '8px',
                            border: '1px solid #ffc107',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.2)'
                        }}>
                            <div style={{ fontSize: '1.8em', fontWeight: 'bold', color: '#ffc107' }}>{stats.inProgress}</div>
                            <div style={{ fontSize: '0.85em', color: '#aaa', marginTop: '5px' }}>În Lucru</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;