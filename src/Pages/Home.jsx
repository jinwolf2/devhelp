import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center">

      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center w-full">
        <div className="max-w-3xl text-center px-4 py-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-[#d4d4d4]">
            Herramientas para Desarrolladores <span className="text-[#007acc]">a un click</span>
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-300">
            Formatea tu JSON, genera código, analiza logs y mucho más. Todo desde una sola web.
          </p>
          <a
            href="#tools"
            className="inline-block bg-[#007acc] text-white font-medium py-3 px-6 rounded hover:bg-[#0587d6] transition"
          >
            Herramientas Frecuentes
          </a>
        </div>
      </section>

      {/* Features / Tools Preview */}
      <section id="tools" className="max-w-6xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-semibold mb-10 text-[#d4d4d4] text-center">
          Algunas Herramientas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link to="/tools/f/jsonformat" className="p-6 border border-gray-700 rounded hover:border-[#007acc] transition">
            <h3 className="text-xl font-semibold mb-3 text-[#d4d4d4]">JSON Formatter</h3>
            <p className="text-sm text-gray-300">
              Limpia y da formato a tus archivos JSON, en segundos.
            </p>
          </Link>
          <Link to="/tools/f/TSgeneration" className="p-6 border border-gray-700 rounded hover:border-[#007acc] transition">
            <h3 className="text-xl font-semibold mb-3 text-[#d4d4d4]">
              Generador de Interfaces TypeScript
            </h3>
            <p className="text-sm text-gray-300">
              Genera tipos TS a partir de tus objetos JSON.
            </p>
          </Link>
          <div className="p-6 border border-gray-700 rounded hover:border-[#007acc] transition">
            <h3 className="text-xl font-semibold mb-3 text-[#d4d4d4]">Minificador de CSS/JS</h3>
            <p className="text-sm text-gray-300">
              Optimiza tus archivos para una carga más rápida.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-6xl mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold mb-6 text-[#d4d4d4]">
          Comienza a ser más productivo hoy
        </h2>
        <p className="text-gray-300 mb-8">
          Prueba ahora nuestras herramientas y agiliza tu flujo de trabajo.
        </p>
        <Link
          to="/tools"
          className="inline-block bg-[#007acc] text-white font-medium py-3 px-6 rounded hover:bg-[#0587d6] transition"
        >
          Empezar Gratis
        </Link>
      </section>
    </main>
  );
}
