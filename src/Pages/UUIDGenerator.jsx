import React, { useState } from 'react';
import { v1 as uuidv1, v4 as uuidv4 } from 'uuid';

export default function UUIDGenerator() {
  const [uuidVersion, setUuidVersion] = useState('v4'); // Versión del UUID (v1 o v4)
  const [generatedUUIDs, setGeneratedUUIDs] = useState([]);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const generateUUIDs = (count = 1) => {
    const newUUIDs = Array.from({ length: count }, () =>
      uuidVersion === 'v4' ? uuidv4() : uuidv1()
    );
    setGeneratedUUIDs(newUUIDs);
  };

  const copyToClipboard = (uuid, index) => {
    navigator.clipboard.writeText(uuid).then(() => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000); // Restaurar el estado después de 2 segundos
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-16 text-[#d4d4d4]" style={{ backgroundColor: '#1e1e1e' }}>
      <h1 className="text-3xl font-bold mb-6">UUID Generator</h1>
      <p className="text-gray-300 mb-8">
        Genera identificadores únicos universales (UUIDs) en formato <strong>v1</strong> o <strong>v4</strong>.
      </p>

      {/* Selección de versión */}
      <div className="mb-6">
        <label className="block text-gray-300 font-semibold mb-2">Versión de UUID:</label>
        <select
          value={uuidVersion}
          onChange={(e) => setUuidVersion(e.target.value)}
          className="bg-[#252526] text-gray-200 border border-gray-600 rounded px-4 py-2 focus:border-[#007ACC] focus:outline-none"
        >
          <option value="v4">UUID v4 (Aleatorio)</option>
          <option value="v1">UUID v1 (Timestamp)</option>
        </select>
      </div>

      {/* Botón para generar UUIDs */}
      <button
        onClick={() => generateUUIDs(5)} // Generar 5 UUIDs por defecto
        className="mb-6 px-4 py-2 rounded bg-[#007ACC] text-white text-sm hover:bg-[#0587d6] transition"
      >
        Generar UUIDs
      </button>

      {/* Lista de UUIDs generados */}
      {generatedUUIDs.length > 0 && (
        <div className="mt-8 space-y-4">
          <h2 className="text-xl font-bold mb-4 text-[#d4d4d4]">UUIDs Generados:</h2>
          {generatedUUIDs.map((uuid, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-[#252526] p-4 rounded border border-gray-600"
            >
              <span className="text-gray-300">{uuid}</span>
              <button
                onClick={() => copyToClipboard(uuid, index)}
                className={`px-4 py-2 rounded text-sm ${
                  copiedIndex === index
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                } transition`}
              >
                {copiedIndex === index ? 'Copiado!' : 'Copiar'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
