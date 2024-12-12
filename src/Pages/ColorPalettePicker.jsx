import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function ColorPalettePicker() {
  const [colors, setColors] = useState([
    '#007ACC', '#D4D4D4', '#252526', '#3C3C3C', '#1E1E1E',
  ]);
  const [newColor, setNewColor] = useState('');
  const [copied, setCopied] = useState(false);

  
  const generateRandomColors = () => {
    const randomColors = Array.from({ length: 5 }, () =>
      `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`
    );
    setColors(randomColors);
  };

  const removeColor = (index) => {
    setColors((prevColors) => prevColors.filter((_, i) => i !== index));
  };

  const exportToTailwind = () => {
    const tailwindColors = colors.reduce((acc, color, index) => {
      acc[`color${index + 1}`] = color;
      return acc;
    }, {});
    return `module.exports = {
  theme: {
    extend: {
      colors: ${JSON.stringify(tailwindColors, null, 2)},
    },
  },
};`;
  };

  const copyToClipboard = () => {
    const tailwindConfig = exportToTailwind();
    navigator.clipboard.writeText(tailwindConfig).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-16 text-[#d4d4d4]" style={{ backgroundColor: '#1e1e1e' }}>
      <h1 className="text-3xl font-bold mb-6">Color Palette Picker</h1>
      <p className="text-gray-300 mb-8">
        Crea, visualiza y exporta una paleta de colores para tu proyecto. Exporta en formato TailwindCSS.
      </p>
      
      {/* Controles */}
      <div className="flex space-x-4 mb-6">
        <input
          type="text"
          placeholder="#RRGGBB"
          value={newColor}
          onChange={(e) => setNewColor(e.target.value)}
          className="w-32 px-4 py-2 rounded bg-[#252526] text-gray-200 border border-gray-600 focus:border-[#007ACC] focus:outline-none"
        />

        <button
          onClick={generateRandomColors}
          className="px-4 py-2 rounded bg-gray-700 text-gray-300 text-sm hover:bg-gray-600 transition"
        >
          Generar Aleatorio
        </button>
      </div>

      {/* Paleta de Colores */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {colors.map((color, index) => (
          <div
            key={index}
            className="relative w-full h-32 rounded shadow-lg"
            style={{ backgroundColor: color }}
          >
            <div className="absolute bottom-2 left-2 right-2 bg-black bg-opacity-50 text-white text-xs rounded px-2 py-1 text-center">
              <span>{color}</span>
            </div>
            <button
              onClick={() => removeColor(index)}
              className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-500"
            >
              &times;
            </button>
          </div>
        ))}
      </div>

      {/* Configuración TailwindCSS */}
      <div className="flex flex-col">
        <div className="w-full bg-[#252526] rounded border border-gray-600 p-4 overflow-auto dark-scroll">
          <SyntaxHighlighter
            language="javascript"
            style={vscDarkPlus}
            customStyle={{ backgroundColor: 'transparent', margin: 0, padding: 0 }}
          >
            {exportToTailwind()}
          </SyntaxHighlighter>
        </div>
        <button
          onClick={copyToClipboard}
          className="mt-4 w-48 px-4 py-2 rounded bg-green-600 text-white text-sm hover:bg-green-500 transition self-end"
        >
          {copied ? 'Copiado!' : 'Copiar Configuración'}
        </button>
      </div>
    </div>
  );
}
