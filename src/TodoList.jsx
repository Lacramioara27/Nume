import { useState } from 'react';

function TodoList() {
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState('');

    function handleAdd() {
        if (input.trim() === '') {
            return;
        }

        setTodos([...todos, input.trim()]);
        setInput('');
    }

    function handleDelete(index) {
        setTodos(
            todos.filter(function (_, i) {
                return i !== index;
            })
        );
    }

    return (
        <section className="widget-card">
            <h3>Todo List</h3>

            <div className="inline-form">
                <input
                    className="berry-input"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Adaugă un task..."
                />

                <button className="berry-button" onClick={handleAdd}>
                    Adaugă
                </button>
            </div>

            {todos.length === 0 ? (
                <p className="muted-text">Nu ai task-uri adăugate încă.</p>
            ) : (
                <ul className="todo-list">
                    {todos.map(function (todo, index) {
                        return (
                            <li key={index}>
                                <span>{todo}</span>
                                <button className="danger-button" onClick={() => handleDelete(index)}>
                                    Șterge
                                </button>
                            </li>
                        );
                    })}
                </ul>
            )}
        </section>
    );
}

export default TodoList;