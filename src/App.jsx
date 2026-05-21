import { BrowserRouter, Routes, Route } from 'react-router';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Navbar from './Navbar';
import Footer from './Footer';
import './App.css';

function App() {
    return (
        <BrowserRouter>
            <div className="app-main-container">
                <header className="berry-header">
                    <h1>PAGINA MEA</h1>
                    <p>Dashboard personal pentru laboratoarele de Programare Web</p>
                </header>

                <Navbar />

                <main className="berry-content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/projects" element={<Projects />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/about" element={<About />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </main>

                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;