import { useEffect, useMemo, useState } from 'react';

const API_URL = 'http://localhost:3000/api/projects';

function ProjectList() {
    const [projects, setProjects] = useState([]);
    const [title, setTitle] = useState('');
    const [tech, setTech] = useState('');

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [sortBy, setSortBy] = useState('date-desc');

    const [editingId, setEditingId] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editTech, setEditTech] = useState('');

    useEffect(function () {
        loadProjects();
    }, []);

    async function loadProjects() {
        try {
            setLoading(true);
            setError('');

            const response = await fetch(API_URL);

            if (!response.ok) {
                throw new Error('Eroare la încărcarea proiectelor');
            }

            const data = await response.json();
            setProjects(data);
        } catch (err) {
            console.error('Eroare:', err);
            setError('Nu s-au putut încărca proiectele. Verifică serverul Express.');
        } finally {
            setLoading(false);
        }
    }

    async function handleAddProject(e) {
        e.preventDefault();

        if (title.trim() === '' || tech.trim() === '') {
            setError('Completează titlul și tehnologia proiectului.');
            return;
        }

        try {
            setError('');

            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: title.trim(),
                    tech: tech.trim(),
                    done: false,
                }),
            });

            if (!response.ok) {
                throw new Error('Eroare la adăugarea proiectului');
            }

            const newProject = await response.json();

            setProjects([...projects, newProject]);
            setTitle('');
            setTech('');
        } catch (err) {
            console.error('Eroare:', err);
            setError('Proiectul nu a putut fi adăugat.');
        }
    }

    async function handleDelete(id) {
        const confirmed = window.confirm('Sigur dorești să ștergi acest proiect?');

        if (!confirmed) {
            return;
        }

        try {
            setError('');

            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Eroare la ștergere');
            }

            setProjects(
                projects.filter(function (project) {
                    return project._id !== id;
                })
            );
        } catch (err) {
            console.error('Eroare:', err);
            setError('Proiectul nu a putut fi șters.');
        }
    }

    async function handleToggle(id, currentDone) {
        try {
            setError('');

            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    done: !currentDone,
                }),
            });

            if (!response.ok) {
                throw new Error('Eroare la actualizarea statusului');
            }

            const updatedProject = await response.json();

            setProjects(
                projects.map(function (project) {
                    return project._id === id ? updatedProject : project;
                })
            );
        } catch (err) {
            console.error('Eroare:', err);
            setError('Statusul proiectului nu a putut fi actualizat.');
        }
    }

    function startEditing(project) {
        setEditingId(project._id);
        setEditTitle(project.title);
        setEditTech(project.tech);
    }

    function cancelEditing() {
        setEditingId(null);
        setEditTitle('');
        setEditTech('');
    }

    async function handleSaveEdit(id) {
        if (editTitle.trim() === '' || editTech.trim() === '') {
            setError('Completează titlul și tehnologia înainte de salvare.');
            return;
        }

        try {
            setError('');

            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: editTitle.trim(),
                    tech: editTech.trim(),
                }),
            });

            if (!response.ok) {
                throw new Error('Eroare la editarea proiectului');
            }

            const updatedProject = await response.json();

            setProjects(
                projects.map(function (project) {
                    return project._id === id ? updatedProject : project;
                })
            );

            cancelEditing();
        } catch (err) {
            console.error('Eroare:', err);
            setError('Proiectul nu a putut fi editat.');
        }
    }

    const filteredProjects = useMemo(
        function () {
            return projects
                .filter(function (project) {
                    const matchesSearch =
                        project.title.toLowerCase().includes(search.toLowerCase()) ||
                        project.tech.toLowerCase().includes(search.toLowerCase());

                    const matchesStatus =
                        statusFilter === 'all' ||
                        (statusFilter === 'done' && project.done) ||
                        (statusFilter === 'progress' && !project.done);

                    return matchesSearch && matchesStatus;
                })
                .sort(function (a, b) {
                    if (sortBy === 'title-asc') {
                        return a.title.localeCompare(b.title);
                    }

                    if (sortBy === 'title-desc') {
                        return b.title.localeCompare(a.title);
                    }

                    if (sortBy === 'date-asc') {
                        return a._id.localeCompare(b._id);
                    }

                    return b._id.localeCompare(a._id);
                });
        },
        [projects, search, statusFilter, sortBy]
    );

    const total = projects.length;
    const done = projects.filter((project) => project.done).length;
    const inProgress = total - done;

    if (loading) {
        return <p className="muted-text">Se încarcă proiectele...</p>;
    }

    return (
        <section className="project-section">
            {error && <p className="error-message">{error}</p>}

            <form className="add-project-form" onSubmit={handleAddProject}>
                <h3>Adaugă proiect nou</h3>

                <div className="form-grid">
                    <input
                        className="berry-input"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Numele proiectului"
                    />

                    <input
                        className="berry-input"
                        value={tech}
                        onChange={(e) => setTech(e.target.value)}
                        placeholder="Tehnologia folosită"
                    />

                    <button className="berry-button" type="submit">
                        Adaugă
                    </button>
                </div>
            </form>

            <div className="project-tools">
                <input
                    className="berry-input"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Caută după titlu sau tehnologie..."
                />

                <select
                    className="berry-select"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="all">Toate</option>
                    <option value="done">Finalizate</option>
                    <option value="progress">În lucru</option>
                </select>

                <select
                    className="berry-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                >
                    <option value="date-desc">Cele mai noi</option>
                    <option value="date-asc">Cele mai vechi</option>
                    <option value="title-asc">Titlu A-Z</option>
                    <option value="title-desc">Titlu Z-A</option>
                </select>
            </div>

            <div className="local-stats">
                <span>Total: {total}</span>
                <span>Finalizate: {done}</span>
                <span>În lucru: {inProgress}</span>
            </div>

            {filteredProjects.length === 0 ? (
                <p className="muted-text">Nu există proiecte pentru filtrul ales.</p>
            ) : (
                <div className="project-grid">
                    {filteredProjects.map(function (project) {
                        const isEditing = editingId === project._id;

                        return (
                            <article
                                className={`project-card ${project.done ? 'completed' : 'in-progress'}`}
                                key={project._id}
                            >
                                {isEditing ? (
                                    <div className="edit-form">
                                        <input
                                            className="berry-input"
                                            value={editTitle}
                                            onChange={(e) => setEditTitle(e.target.value)}
                                        />

                                        <input
                                            className="berry-input"
                                            value={editTech}
                                            onChange={(e) => setEditTech(e.target.value)}
                                        />

                                        <div className="button-row">
                                            <button
                                                className="success-button"
                                                type="button"
                                                onClick={() => handleSaveEdit(project._id)}
                                            >
                                                Salvează
                                            </button>

                                            <button className="ghost-button" type="button" onClick={cancelEditing}>
                                                Anulează
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <div className="project-card-header">
                                            <h3>{project.title}</h3>

                                            <span className={project.done ? 'status done' : 'status progress'}>
                                                {project.done ? 'Finalizat' : 'În lucru'}
                                            </span>
                                        </div>

                                        <p>
                                            <strong>Tehnologii:</strong> {project.tech}
                                        </p>

                                        <div className="button-row">
                                            <button
                                                className="success-button"
                                                type="button"
                                                onClick={() => handleToggle(project._id, project.done)}
                                            >
                                                {project.done ? 'Marchează în lucru' : 'Finalizează'}
                                            </button>

                                            <button
                                                className="secondary-button"
                                                type="button"
                                                onClick={() => startEditing(project)}
                                            >
                                                Editează
                                            </button>

                                            <button
                                                className="danger-button"
                                                type="button"
                                                onClick={() => handleDelete(project._id)}
                                            >
                                                Șterge
                                            </button>
                                        </div>
                                    </>
                                )}
                            </article>
                        );
                    })}
                </div>
            )}
        </section>
    );
}

export default ProjectList;