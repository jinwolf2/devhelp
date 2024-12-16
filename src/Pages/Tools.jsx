import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CodeBracketIcon,
  DocumentTextIcon,
  HashtagIcon,
  SwatchIcon,
  BeakerIcon,
  KeyIcon,
  TableCellsIcon,
  ArrowPathRoundedSquareIcon,
  CubeIcon,
  MagnifyingGlassIcon,
  DocumentMagnifyingGlassIcon,
  ServerIcon, // Icono añadido para la sección BBDD
} from '@heroicons/react/24/outline';

export default function Tools() {
  const [activeTab, setActiveTab] = useState('frontend');

  const frontendTools = [
    {
      name: 'JSON Formatter',
      path: '/tools/f/jsonformat',
      description: 'Formatea y valida JSON para una visualización clara y depuración eficiente.',
      icon: CodeBracketIcon,
    },
    {
      name: 'TS Interface Generator',
      path: '/tools/f/TSgeneration',
      description: 'Genera interfaces TypeScript a partir de JSON, facilitando el tipado en tus proyectos.',
      icon: DocumentTextIcon,
    },
    {
      name: 'CSS/JS Minifier',
      path: '/tools/f/CSSJSmini',
      description: 'Minifica archivos CSS y JavaScript para mejorar el rendimiento de tu sitio.',
      icon: HashtagIcon,
    },
    {
      name: 'Color Palette Picker',
      path: '/tools/f/ColorPalettePicker',
      description: 'Selecciona paletas de colores personalizadas y convierte entre formatos como HEX, RGB y HSL.',
      icon: SwatchIcon,
    },
    {
      name: 'Gradient Generator',
      path: '/tools/f/GradientGenerator',
      description: 'Crea gradientes CSS de forma sencilla y obtén el código listo para usar.',
      icon: BeakerIcon,
    },
  ];

  const backendTools = [
    {
      name: 'JWT Decoder',
      path: '/tools/b/JWTDecoder',
      description: 'Decodifica y analiza tokens JWT para comprender su contenido y claims.',
      icon: KeyIcon,
    },
    {
      name: 'Hash Generator (MD5/SHA)',
      path: '/tools/b/HashGenerator',
      description: 'Genera hashes rápidamente, útil para comprobar la integridad de datos o crear pruebas.',
      icon: TableCellsIcon,
    },
    {
      name: 'SQL <-> JSON Converter',
      path: '/tools/b/SQLtoJSON',
      description: 'Convierte datos entre JSON y SQL para acelerar migraciones y pruebas.',
      icon: ArrowPathRoundedSquareIcon,
    },
    {
      name: 'Generador UUID',
      path: '/tools/b/UUIDGenerator',
      description: 'Genera identificadores UUID únicos de manera aleatoria.',
      icon: CubeIcon,
    },
    {
      name: 'Dockerfile Template Generator',
      path: '/tools/b/DockerTemplateGen',
      description: 'Genera Dockerfiles básicos a partir de parámetros simples, agilizando tu proceso de contenedorización.',
      icon: DocumentMagnifyingGlassIcon,
    },
  ];

  const databaseTools = [
    {
      name: 'SQL Editor',
      path: '/tools/bd/SQLeditor',
      description:
        'Edita y prueba tus consultas SQL en tiempo real con conexión a una base de datos compartida.',
      icon: ServerIcon,
    },
  ];

  const moreTools = [
    {
      name: 'Regex Test',
      path: '/tools/m/RegexTest',
      description: 'Prueba y depura expresiones regulares con resultados en tiempo real.',
      icon: MagnifyingGlassIcon,
    },
    {
      name: 'OCR Tool',
      path: '/tools/m/OCRTool',
      description: 'Extrae texto de imágenes utilizando reconocimiento óptico de caracteres.',
      icon: DocumentMagnifyingGlassIcon,
    },
  ];

  const toolsToDisplay =
    activeTab === 'frontend'
      ? frontendTools
      : activeTab === 'backend'
      ? backendTools
      : activeTab === 'database'
      ? databaseTools
      : moreTools;

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 text-[#d4d4d4]">
      <h1 className="text-3xl font-bold mb-8 text-center">Herramientas</h1>
      <p className="text-gray-300 mb-8 text-center">
        Selecciona una categoría para explorar las herramientas disponibles.
      </p>

      {/* Tabs */}
      <div className="flex justify-center space-x-4 mb-8 flex-wrap">
        <button
          onClick={() => setActiveTab('frontend')}
          className={`px-6 py-2 rounded ${
            activeTab === 'frontend'
              ? 'bg-[#007acc] text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          } transition`}
        >
          Frontend
        </button>
        <button
          onClick={() => setActiveTab('backend')}
          className={`px-6 py-2 rounded ${
            activeTab === 'backend'
              ? 'bg-[#007acc] text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          } transition`}
        >
          Backend
        </button>
        <button
          onClick={() => setActiveTab('database')}
          className={`px-6 py-2 rounded ${
            activeTab === 'database'
              ? 'bg-[#007acc] text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          } transition`}
        >
          BBDD
        </button>
        <button
          onClick={() => setActiveTab('moreTools')}
          className={`px-6 py-2 rounded ${
            activeTab === 'moreTools'
              ? 'bg-[#007acc] text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          } transition`}
        >
          Más
        </button>
      </div>

      {/* Grid de Herramientas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {toolsToDisplay.map((tool, index) => (
          <Link
            to={tool.path}
            key={index}
            className="p-6 border border-gray-700 rounded-lg hover:border-[#007acc] transition backdrop-blur-md bg-white/10 shadow-lg shadow-gray-900/50 hover:shadow-[#007acc]/50 min-h-[220px] flex flex-col justify-between relative"
          >
            <div className="flex items-center mb-3">
              <tool.icon className="h-6 w-6 text-[#007acc] mr-2" />
              <h3 className="text-xl font-semibold text-white">{tool.name}</h3>
            </div>
            <p className="text-sm text-gray-200 line-clamp-3 overflow-hidden">
              {tool.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
