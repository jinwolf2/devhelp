import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { minify as jsMinify } from 'terser';
import { minify as cssoMinify } from 'csso';

export default function CssJsMinifier() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [mode, setMode] = useState('js'); // 'js' o 'css'

  const handleMinify = async () => {
    setError('');
    setOutput('');
    setCopied(false);

    try {
      if (mode === 'js') {
        // Minificar JavaScript
        const result = await jsMinify(input);
        if (result.error) {
          throw result.error;
        }
        setOutput(result.code || '');
      } else {
        // Minificar CSS
        const result = cssoMinify(input);
        setOutput(result.css || '');
      }
    } catch (err) {
      setError(`Error al minificar: ${err.message || err.toString()}`);
    }
  };

  const copyToClipboard = () => {
    if (output) {
      navigator.clipboard.writeText(output).then(() => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 2000);
      });
    }
  };

  const language = mode === 'js' ? 'javascript' : 'css';

  return (
    <div className="max-w-6xl mx-auto px-4 py-16 text-[#d4d4d4]" style={{ backgroundColor: '#1e1e1e' }}>
      <h1 className="text-3xl font-bold mb-6">CSS/JS Minifier</h1>
      <p className="text-gray-300 mb-8">
        Pega tu código CSS o JS en el recuadro de la izquierda y presiona "Minificar".
      </p>
      
      <div className="flex items-center space-x-4 mb-4">
        <label className="text-gray-200 font-semibold">Tipo:</label>
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          className="bg-[#252526] text-gray-200 border border-gray-600 rounded px-4 py-1 focus:border-[#007acc] focus:outline-none"
        >
          <option value="js">JavaScript</option>
          <option value="css">CSS</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Columna Izquierda */}
        <div className="flex flex-col">
          {/* Título del panel de entrada */}
          <div className="mb-2">
            <label className="font-semibold text-gray-200">{mode === 'js' ? 'JS Original' : 'CSS Original'}</label>
          </div>
          <textarea
            className="w-full h-96 p-4 bg-[#252526] text-gray-200 rounded border border-gray-600 focus:border-[#007acc] focus:outline-none font-mono text-sm resize-none dark-scroll"
            placeholder={mode === 'js' ? 'function test() { console.log("hello"); }' : 'body { background: #000; color: #fff; }'}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          ></textarea>
          {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
        </div>

        {/* Columna Derecha */}
        <div className="flex flex-col">
          {/* Título del panel de salida */}
          <div className="mb-2">
            <label className="font-semibold text-gray-200">Código Minificado</label>
          </div>
          <div className="w-full h-96 p-4 bg-[#252526] text-gray-200 rounded border border-gray-600 overflow-auto dark-scroll">
            {output ? (
              <SyntaxHighlighter
                language={language}
                style={vscDarkPlus}
                customStyle={{ backgroundColor: 'transparent', margin: 0, padding: 0 }}
              >
                {output}
              </SyntaxHighlighter>
            ) : (
              <div className="text-gray-400 font-mono text-sm">No hay output todavía</div>
            )}
          </div>
          {/* Botones debajo del output */}
          <div className="flex space-x-2 mt-4 justify-end">
            <button
              onClick={handleMinify}
              className="w-24 px-4 py-2 rounded bg-[#007acc] text-white text-sm hover:bg-[#0587d6] transition text-center"
            >
              Minificar
            </button>
            <button
              onClick={copyToClipboard}
              className={`w-24 px-4 py-2 rounded text-sm transition text-center ${
                output ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-600 text-gray-500 cursor-not-allowed'
              }`}
              disabled={!output}
            >
              {copied ? 'Copiado!' : 'Copiar'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
