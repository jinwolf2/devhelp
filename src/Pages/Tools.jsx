import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Tools() {
  const [activeTab, setActiveTab] = useState('frontend');

  const frontendTools = [
    { name: 'JSON Formatter', path: '/tools/f/jsonformat', description: 'Formatea y valida JSON rápidamente. Esta herramienta te ayuda a visualizar y depurar mejor tu estructura de datos, evitando errores de sintaxis y manteniendo un código más limpio.' },
    { name: 'TS Interface Generator', path: '/tools/f/TSgeneration', description: 'Genera tipos TypeScript a partir de JSON. Facilita la integración con tu código y reduce errores de tipado.' },
    { name: 'CSS/JS Minifier', path: '/tools/f/CSSJSmini', description: 'Minifica tus archivos para optimizar la carga y mejorar el performance de tu sitio.' },
    { name: 'Color Palette Picker', path: '/tools/f/ColorPalettePicker', description: 'Selecciona paletas de color personalizadas, convierte entre HEX/RGB/HSL y crea combinaciones accesibles.' },
    { name: 'Gradient Generator', path: '/tools/f/GradientGenerator', description: 'Crea gradientes CSS con facilidad y obtén el código listo para usar en tu proyecto.' },
  ];

  const backendTools = [
    { name: 'JWT Decoder', path: '/tools/b/JWTDecoder', description: 'Decodifica y analiza tokens JWT para comprender su contenido y claims.' },
    { name: 'Hash Generator (MD5/SHA)', path: '/tools/b/HashGenerator', description: 'Genera hashes rápidamente, útil para comprobar integridad de datos o crear pruebas.' },
    { name: 'SQL <-> JSON Converter', path: '/tools/b/SQLtoJSON', description: 'Convierte datos entre JSON y SQL para acelerar migraciones y pruebas.' },
    { name: 'Generador UUID', path: '/tools/b/UUIDGenerator', description: 'Genera identificadores UUID únicos de manera aleatoria.' },
    { name: 'Dockerfile Template Generator', path: '/tools/b/DockerTemplateGen', description: 'Genera Dockerfiles básicos a partir de parámetros simples, agilizando tu proceso de contenedorización.' },
  ];

  const toolsToDisplay = activeTab === 'frontend' ? frontendTools : backendTools;

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-[#d4d4d4] mb-10">Herramientas</h1>
      <p className="text-gray-300 mb-10">
        Selecciona una categoría para ver las herramientas disponibles.
      </p>

      {/* Tabs */}
      <div className="flex space-x-4 mb-8">
        <button
          onClick={() => setActiveTab('frontend')}
          className={`px-4 py-2 rounded ${
            activeTab === 'frontend' 
              ? 'bg-[#007acc] text-white' 
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          } transition`}
        >
          Frontend
        </button>
        <button
          onClick={() => setActiveTab('backend')}
          className={`px-4 py-2 rounded ${
            activeTab === 'backend' 
              ? 'bg-[#007acc] text-white' 
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          } transition`}
        >
          Backend
        </button>
      </div>

      {/* Grid de Herramientas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {toolsToDisplay.map((tool, index) => (
          <Link
            to={tool.path}
            key={index}
            className="p-6 border border-gray-700 rounded hover:border-[#007acc] transition min-h-[250px] flex flex-col cursor-pointer"
          >
            <h3 className="text-xl font-semibold mb-3 text-[#d4d4d4]">
              {tool.name}
            </h3>
            <p className="text-sm text-gray-300 line-clamp-3 overflow-hidden">
              {tool.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
