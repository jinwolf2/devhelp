import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function TSInterfaceGenerator() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const generateInterfaces = () => {
    try {
      const parsed = JSON.parse(input);
      const tsInterface = jsonToTS(parsed, 'Root');
      setOutput(tsInterface);
      setError('');
    } catch (err) {
      setError('JSON no válido');
      setOutput('');
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

  // Función recursiva para generar TS a partir de un valor
  const jsonToTS = (value, name = 'Root') => {
    const indent = (n) => '  '.repeat(n);

    const getType = (val, depth = 1) => {
      if (val === null) return 'any';
      if (Array.isArray(val)) {
        if (val.length === 0) {
          return 'any[]';
        } else {
          // Tomamos el primer elemento para inferir tipo
          const arrType = getType(val[0], depth + 1);
          return arrType.endsWith('[]') ? arrType : `${arrType}[]`;
        }
      }
      switch (typeof val) {
        case 'string':
          return 'string';
        case 'number':
          return 'number';
        case 'boolean':
          return 'boolean';
        case 'object':
          // Es un objeto, necesitamos generar una interfaz
          return objectToInterface(val, depth + 1);
        default:
          return 'any';
      }
    };

    const objectToInterface = (obj, depth) => {
      const entries = Object.entries(obj);
      if (entries.length === 0) {
        return '{}';
      }
      const props = entries.map(([key, val]) => {
        const propType = getType(val, depth + 1);
        return `${indent(depth)}${/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(key) ? key : `"${key}"`}: ${propType};`;
      });
      return `{\n${props.join('\n')}\n${indent(depth - 1)}}`;
    };

    // Asumimos el valor raíz es objeto o array
    let result;
    if (Array.isArray(value)) {
      // Si es un array, generamos un type
      if (value.length === 0) {
        result = `type ${name} = any[];`;
      } else {
        const arrType = getType(value[0], 1);
        result = `type ${name} = ${arrType};`;
      }
    } else if (typeof value === 'object' && value !== null) {
      // Si es objeto
      const interfaceBody = objectToInterface(value, 1);
      result = `interface ${name} ${interfaceBody}`;
    } else {
      // Si es primitivo
      const primitiveType = getType(value);
      result = `type ${name} = ${primitiveType};`;
    }

    return result;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-16 text-[#d4d4d4]" style={{ backgroundColor: '#1e1e1e' }}>
      <h1 className="text-3xl font-bold mb-6">TS Interface Generator</h1>
      <p className="text-gray-300 mb-8">
        Pega tu JSON a la izquierda y genera interfaces TypeScript automáticamente.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Columna Izquierda */}
        <div className="flex flex-col">
          {/* Título del panel de entrada */}
          <div className="mb-2">
            <label className="font-semibold text-gray-200">JSON sin formato</label>
          </div>
          <textarea
            className="w-full h-96 p-4 bg-[#252526] text-gray-200 rounded border border-gray-600 focus:border-[#007acc] focus:outline-none font-mono text-sm resize-none dark-scroll"
            placeholder='{"ejemplo":"valor"}'
            value={input}
            onChange={(e) => setInput(e.target.value)}
          ></textarea>
          {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
        </div>

        {/* Columna Derecha */}
        <div className="flex flex-col">
          {/* Título del panel de salida */}
          <div className="mb-2">
            <label className="font-semibold text-gray-200">Interfaces TypeScript</label>
          </div>
          <div className="w-full h-96 p-4 bg-[#252526] text-gray-200 rounded border border-gray-600 overflow-auto dark-scroll">
            {output ? (
              <SyntaxHighlighter
                language="typescript"
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
              onClick={generateInterfaces}
              className="w-24 px-4 py-2 rounded bg-[#007acc] text-white text-sm hover:bg-[#0587d6] transition text-center"
            >
              Generar
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
