import { BrowserRouter, Routes, Route } from 'react-router'; // Verifică să fie 'react-router-dom'
import { useState } from 'react';
import Home from './pages/Home';
import ContactForm from './ContactForm';
import QuickNote from './QuickNote';
import TodoList from './TodoList';
import ProjectList from './ProjectList';
import Contact from './pages/Contact';
import Projects from './pages/Projects';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ textAlign: 'center', backgroundColor: '#1a1a1a', color: 'white', minHeight: '100vh', padding: '20px' }}>
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </BrowserRouter>

      <hr style={{ margin: '30px 0' }} />
      <ProjectList />
      <TodoList />
      <div style={{ margin: '20px 0', border: '1px solid #444', padding: '10px' }}>
        <p>Ai apasat de {count} ori</p>
        <button onClick={() => setCount(count + 1)}>Click</button>
      </div>
      <QuickNote />
      <ContactForm />

    </div> 
  );
}

export default App;