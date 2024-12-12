import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function SQLJSONConverter() {
  const [input, setInput] = useState('');
  const [conversionMode, setConversionMode] = useState('sql-to-json'); // Modos: 'sql-to-json' o 'json-to-sql'
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const convert = () => {
    setError('');
    try {
      if (conversionMode === 'sql-to-json') {
        setOutput(sqlToJson(input));
      } else if (conversionMode === 'json-to-sql') {
        setOutput(jsonToSql(input));
      }
    } catch (err) {
      setError('Error en la conversión. Por favor verifica el formato.');
      setOutput('');
    }
  };

  const sqlToJson = (sql) => {
    const rows = sql.split('\n').map((row) => row.trim()).filter(Boolean);
    const headers = rows[0].split('|').map((header) => header.trim());
    const data = rows.slice(1).map((row) => {
      const values = row.split('|').map((value) => value.trim());
      return headers.reduce((obj, header, index) => {
        obj[header] = values[index];
        return obj;
      }, {});
    });
    return JSON.stringify(data, null, 2);
  };

  const jsonToSql = (json) => {
    const data = JSON.parse(json);
    if (!Array.isArray(data)) throw new Error('El JSON debe ser un array.');
    const headers = Object.keys(data[0]);
    const rows = data.map((row) => {
      const values = headers.map((header) => `'${row[header]}'`);
      return `(${values.join(', ')})`;
    });
    const tableName = 'tabla'; // Puedes pedir al usuario que introduzca el nombre de la tabla si es necesario
    return `INSERT INTO ${tableName} (${headers.join(', ')}) VALUES\n${rows.join(',\n')};`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-16 text-[#d4d4d4]" style={{ backgroundColor: '#1e1e1e' }}>
      <h1 className="text-3xl font-bold mb-6">SQL &lt;-&gt; JSON Converter</h1>
      <p className="text-gray-300 mb-8">
        Convierte entre SQL y JSON de forma fácil y rápida. Soporta tablas SQL y arrays JSON.
      </p>

      {/* Modo de conversión */}
      <div className="mb-6">
        <label className="block text-gray-300 font-semibold mb-2">Modo de Conversión:</label>
        <select
          value={conversionMode}
          onChange={(e) => setConversionMode(e.target.value)}
          className="bg-[#252526] text-gray-200 border border-gray-600 rounded px-4 py-2 focus:border-[#007ACC] focus:outline-none"
        >
          <option value="sql-to-json">SQL a JSON</option>
          <option value="json-to-sql">JSON a SQL</option>
        </select>
      </div>

      {/* Entrada */}
      <div className="mb-6">
        <label className="block text-gray-300 font-semibold mb-2">
          {conversionMode === 'sql-to-json' ? 'Tabla SQL:' : 'JSON:'}
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            conversionMode === 'sql-to-json'
              ? 'Columna1 | Columna2\nValor1   | Valor2'
              : '[\n  { "columna1": "valor1", "columna2": "valor2" }\n]'
          }
          className="w-full h-32 p-4 bg-[#252526] text-gray-200 rounded border border-gray-600 focus:border-[#007ACC] focus:outline-none resize-none"
        />
        <button
          onClick={convert}
          className="mt-4 px-4 py-2 rounded bg-[#007ACC] text-white text-sm hover:bg-[#0587d6] transition"
        >
          Convertir
        </button>
      </div>

      {/* Error */}
      {error && <div className="text-red-500 text-sm font-semibold mt-4">{error}</div>}

      {/* Salida */}
      {output && (
        <div className="mt-8">
          <label className="block text-gray-300 font-semibold mb-2">Resultado:</label>
          <div className="bg-[#252526] p-4 rounded border border-gray-600 overflow-auto dark-scroll">
            <SyntaxHighlighter
              language={conversionMode === 'sql-to-json' ? 'json' : 'sql'}
              style={vscDarkPlus}
              customStyle={{ backgroundColor: 'transparent', margin: 0, padding: 0 }}
            >
              {output}
            </SyntaxHighlighter>
          </div>
          <button
            onClick={copyToClipboard}
            className="mt-4 px-4 py-2 rounded bg-green-600 text-white text-sm hover:bg-green-500 transition"
          >
            {copied ? 'Copiado!' : 'Copiar Resultado'}
          </button>
        </div>
      )}
    </div>
  );
}
