import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function GradientGenerator() {
  const [gradientType, setGradientType] = useState('linear'); // 'linear' o 'radial'
  const [angle, setAngle] = useState(90); // Ángulo para gradiente lineal
  const [colors, setColors] = useState(['#007ACC']); // Colores iniciales
  const [copied, setCopied] = useState(false);

  const handleColorChange = (color, index) => {
    const newColors = [...colors];
    newColors[index] = color;
    setColors(newColors);
  };

  const addColor = () => {
    setColors([...colors, '#FFFFFF']); // Agrega un nuevo color predeterminado
  };

  const removeColor = (index) => {
    setColors(colors.filter((_, i) => i !== index));
  };

  const generateGradientCSS = () => {
    if (gradientType === 'linear') {
      return `linear-gradient(${angle}deg, ${colors.join(', ')})`;
    }
    return `radial-gradient(${colors.join(', ')})`;
  };

  const exportToCSS = () => {
    return `background: ${generateGradientCSS()};`;
  };

  const copyToClipboard = (content) => {
    navigator.clipboard.writeText(content).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-16 text-[#d4d4d4]" style={{ backgroundColor: '#1e1e1e' }}>
      <h1 className="text-3xl font-bold mb-6 text-center md:text-left">Gradient Generator</h1>
      <p className="text-gray-300 mb-8 text-center md:text-left">
        Crea gradientes personalizados con colores dinámicos y expórtalos a TailwindCSS o CSS.
      </p>

      {/* Tipo de gradiente */}
      <div className="mb-6">
        <label className="text-gray-300 font-semibold block mb-2">Tipo de Gradiente:</label>
        <select
          value={gradientType}
          onChange={(e) => setGradientType(e.target.value)}
          className="w-full md:w-auto bg-[#252526] text-gray-200 border border-gray-600 rounded px-4 py-2 focus:border-[#007ACC] focus:outline-none"
        >
          <option value="linear">Lineal</option>
          <option value="radial">Radial</option>
        </select>
        {gradientType === 'linear' && (
          <div className="mt-4">
            <label className="text-gray-300 font-semibold block mb-2">Ángulo (°):</label>
            <input
              type="number"
              value={angle}
              onChange={(e) => setAngle(e.target.value)}
              className="w-full md:w-32 px-4 py-2 rounded bg-[#252526] text-gray-200 border border-gray-600 focus:border-[#007ACC] focus:outline-none"
              min="0"
              max="360"
            />
          </div>
        )}
      </div>

      {/* Selección dinámica de colores */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Selecciona los colores</h2>
        <div className="flex flex-wrap gap-4">
          {colors.map((color, index) => (
            <div key={index} className="flex flex-col items-center w-1/2 md:w-auto">
              <input
                type="color"
                value={color}
                onChange={(e) => handleColorChange(e.target.value, index)}
                className="w-20 h-20 border-0 cursor-pointer"
              />
              <button
                onClick={() => removeColor(index)}
                className="mt-2 bg-red-600 text-white px-4 py-1 rounded text-sm hover:bg-red-500 transition w-full"
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={addColor}
          className="mt-4 px-4 py-2 rounded bg-[#007ACC] text-white text-sm hover:bg-[#0587d6] transition w-full md:w-auto"
        >
          Añadir Color
        </button>
      </div>

      {/* Vista previa del gradiente */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Vista Previa</h2>
        <div
          className="w-full h-32 rounded shadow-lg border border-gray-600"
          style={{ background: generateGradientCSS() }}
        ></div>
      </div>

      {/* Exportación TailwindCSS */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Exportación TailwindCSS</h2>
        <div className="w-full bg-[#252526] rounded border border-gray-600 p-4 overflow-auto dark-scroll">
          <SyntaxHighlighter
            language="javascript"
            style={vscDarkPlus}
            customStyle={{ backgroundColor: 'transparent', margin: 0, padding: 0 }}
          >
            {`module.exports = {
  theme: {
    extend: {
      backgroundImage: {
        customGradient: '${generateGradientCSS()}',
      },
    },
  },
};`}
          </SyntaxHighlighter>
        </div>
        <button
          onClick={() => copyToClipboard(`module.exports = {
  theme: {
    extend: {
      backgroundImage: {
        customGradient: '${generateGradientCSS()}',
      },
    },
  },
};`)}
          className="mt-4 w-full md:w-48 px-4 py-2 rounded bg-green-600 text-white text-sm hover:bg-green-500 transition self-end"
        >
          {copied ? 'Copiado!' : 'Copiar Configuración'}
        </button>
      </div>

      {/* Exportación CSS */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Exportación CSS</h2>
        <div className="w-full bg-[#252526] rounded border border-gray-600 p-4 overflow-auto dark-scroll">
          <SyntaxHighlighter
            language="css"
            style={vscDarkPlus}
            customStyle={{ backgroundColor: 'transparent', margin: 0, padding: 0 }}
          >
            {exportToCSS()}
          </SyntaxHighlighter>
        </div>
        <button
          onClick={() => copyToClipboard(exportToCSS())}
          className="mt-4 w-full md:w-48 px-4 py-2 rounded bg-green-600 text-white text-sm hover:bg-green-500 transition self-end"
        >
          {copied ? 'Copiado!' : 'Copiar CSS'}
        </button>
      </div>
    </div>
  );
}
