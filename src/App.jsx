import { useState } from 'react';
// Importăm componentele tale - asigură-te că numele fișierelor sunt corecte
import Home from './pages/Home';
import ContactForm from './ContactForm';
import QuickNote from './QuickNote';
import TodoList from './TodoList';
import ProjectList from './ProjectList';
import Contact from './pages/Contact';
import Projects from './pages/Projects';
import './App.css';

function App() {
  const [count, setCount] = useState(0); // Counter-ul tău e în siguranță aici
  const [activeTab, setActiveTab] = useState('home'); // Navigare simplă fără erori de rute

  return (
    <div className="app-main-container">
      {/* HEADER FIX SUS */}
      <header className="berry-header">
        <h1>PAGINA MEA</h1>
      </header>

      {/* NAVBAR SIMPLU - Schimbă tab-urile fără refresh */}
      <nav className="berry-nav">
        <button onClick={() => setActiveTab('home')}>Home</button>
        <button onClick={() => setActiveTab('projects')}>Proiecte</button>
        <button onClick={() => setActiveTab('contact')}>Contact</button>
      </nav>

      {/* LAYOUT-UL TIP DASHBOARD (Lateral) */}
      <div className="dashboard-body">
        
        {/* SIDEBAR STÂNGA - DOAR LISTA DE PROIECTE */}
        <aside className="berry-sidebar">
          <ProjectList />
        </aside>

        {/* CONȚINUT DREAPTA - AICI PUNEM TOTUL */}
        <main className="berry-content">
          
          {/* Afișăm pagina în funcție de butonul apăsat */}
          <section className="page-viewer">
            {activeTab === 'home' && <Home />}
            {activeTab === 'projects' && <Projects />}
            {activeTab === 'contact' && <Contact />}
          </section>

          <div className="separator"></div>

          {/* COUNTER-UL TĂU REVENIT LA VIAȚĂ */}
          <div className="counter-card">
            <p>Ai apăsat de <span>{count}</span> ori</p>
            <button onClick={() => setCount(count + 1)}>Click</button>
          </div>

          <div className="separator"></div>

          {/* TOATE CELELALTE COMPONENTE PE CARE NU VREM SĂ LE PIERDEM */}
          <div className="extra-widgets">
            <TodoList />
            <QuickNote />
            <ContactForm />
          </div>
          
        </main>
      </div>
    </div>
  );
}

export default App;