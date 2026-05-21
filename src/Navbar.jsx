import { NavLink } from 'react-router';

function Navbar() {
    return (
        <nav className="berry-nav">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/projects">Proiecte</NavLink>
            <NavLink to="/contact">Contact</NavLink>
            <NavLink to="/about">About</NavLink>
        </nav>
    );
}

export default Navbar;