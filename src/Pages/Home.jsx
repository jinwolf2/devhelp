import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center">
      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center w-full">
        <div className="max-w-3xl text-center px-4 py-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-[#d4d4d4]">
            Herramientas para Desarrolladores{" "}
            <span className=" bg-clip-text text-transparent bg-gradient-to-bl from-blue-500 to-cyan-200 transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-11 duration-300">
              a un click
            </span>
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-300">
            Formatea tu JSON, genera código, analiza logs y mucho más. Todo
            desde una sola web.
          </p>
          <a
            href="#tools"
            className="inline-block transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 p-2 rounded-2xl hover:shadow-md hover:shadow-indigo-300"
          >
            Herramientas Frecuentes
          </a>
        </div>
      </section>

      {/* Features / Tools Preview */}
      <section id="tools" className="max-w-6xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-semibold mb-10 text-[#d4d4d4] text-center">
          Herramientas basicas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link
            to="/tools/f/jsonformat"
            className="p-6 border border-gray-700 rounded-lg hover:border-[#007acc] transition backdrop-blur-md bg-white/10 shadow-lg shadow-gray-900/50 hover:shadow-[#007acc]/50"
          >
            <h3 className="text-xl font-semibold mb-3 text-white">
              JSON Formatter
            </h3>
            <p className="text-sm text-gray-200">
              Limpia y da formato a tus archivos JSON, en segundos.
            </p>
          </Link>
          <Link
            to="/tools/f/TSgeneration"
            className="p-6 border border-gray-700 rounded-lg hover:border-[#007acc] transition backdrop-blur-md bg-white/10 shadow-lg shadow-gray-900/50 hover:shadow-[#007acc]/50"
          >
            <h3 className="text-xl font-semibold mb-3 text-white">
              Generador de Interfaces TypeScript
            </h3>
            <p className="text-sm text-gray-200">
              Genera tipos TS a partir de tus objetos JSON.
            </p>
          </Link>
          <Link
            to="/tools/f/CSSJSmini"
            className="p-6 border border-gray-700 rounded-lg hover:border-[#007acc] transition backdrop-blur-md bg-white/10 shadow-lg shadow-gray-900/50 hover:shadow-[#007acc]/50"
          >
            <h3 className="text-xl font-semibold mb-3 text-white">
              Minificador de CSS/JS
            </h3>
            <p className="text-sm text-gray-200">
              Optimiza tus archivos para una carga más rápida.
            </p>
          </Link>
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
          className="inline-block transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 p-2 rounded-2xl hover:shadow-md hover:shadow-indigo-300"
        >
          Empezar Gratis
        </Link>
      </section>
    </main>
  );
}
