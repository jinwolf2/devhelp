import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <header className="w-full border-b border-gray-700">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-semibold text-[#007acc] hover:opacity-90">
          devhelp.dev
        </Link>
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-[#007acc] transition">Inicio</Link>
          <Link to="/tools" className="hover:text-[#007acc] transition">Herramientas</Link>
          <Link to="/docs" className="hover:text-[#007acc] transition">Docs</Link>
          <Link to="/contact" className="hover:text-[#007acc] transition">Contacto</Link>
        </nav>
      </div>
    </header>
  );
}
