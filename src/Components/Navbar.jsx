import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="w-full border-b border-gray-700">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-bl from-blue-500 to-cyan-200 hover:opacity-90">
          devhelp.dev
        </Link>
        <button
          className="md:hidden text-gray-300 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-6 h-6"
          >
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
            )}
          </svg>
        </button>
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-[#007acc] transition">Inicio</Link>
          <Link to="/tools" className="hover:text-[#007acc] transition">Herramientas</Link>
          <Link to="/docs" className="hover:text-[#007acc] transition">Docs</Link>
          <Link to="/support" className="hover:text-[#007acc] transition">Apoyo</Link>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-4 py-4 bg-[#1e1e1e] border-t border-gray-700">
          <nav className="space-y-4">
            <Link to="/" className="block hover:text-[#007acc] transition" onClick={() => setIsMobileMenuOpen(false)}>
              Inicio
            </Link>
            <Link to="/tools" className="block hover:text-[#007acc] transition" onClick={() => setIsMobileMenuOpen(false)}>
              Herramientas
            </Link>
            <Link to="/docs" className="block hover:text-[#007acc] transition" onClick={() => setIsMobileMenuOpen(false)}>
              Docs
            </Link>
            <Link to="/support" className="block hover:text-[#007acc] transition" onClick={() => setIsMobileMenuOpen(false)}>
              Apoyo
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
