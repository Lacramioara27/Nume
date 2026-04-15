import Card from './Card';
import QuickNote from './QuickNote';
import TodoList from './TodoList';
import ProjectList from './ProjectList';
function App() {
    const projects = [
        { title: "Proiect 1", description: "Pagina mea personală realizată în HTML/CSS" },
        { title: "Proiect 2", description: "Calculator de buget în JavaScript" },
        { title: "Proiect 3", description: "Dashboard interactiv în React" },
        { title: "Proiect 4", description: "Aplicație nouă adăugată pentru test" }
    ];

    return (
        function App() {
            return (
                <div className="App">
                    <h1>Dashboard-ul meu</h1>
                    <ProjectList /> {/* Aici va apărea lista ta */}
                </div>
            );
        }
      //  <div style={{ padding: '40px', maxWidth: '600px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
        <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', margin: '10px 0' }}>
  
      <h1>Pagina mea</h1>
            <hr />

            {/* Secțiunea Proiecte (Lab 4) */}
            {/*//<div style={{ marginBottom: '40px' }}>*/ }
                <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', margin: '10px 0' }}>

                {projects.map(function (item, index) {
                    return (
                        <Card
                            key={index}
                            title={item.title}
                            description={item.description}
                        />
                    );
                })}
            </div>

            <h1 style={{ color: '#007bff', marginTop: '50px' }}>Laborator 5: State & Formulare</h1>
            <hr />

            <QuickNote />
            <TodoList />
        </div>
    );
}

export default App;