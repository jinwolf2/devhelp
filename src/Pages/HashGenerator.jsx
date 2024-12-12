import React, { useState } from 'react';
import crypto from 'crypto-js'; // Usaremos la librería crypto-js para generar hashes.

export default function HashGenerator() {
  const [input, setInput] = useState('');
  const [hashAlgorithm, setHashAlgorithm] = useState('MD5');
  const [hash, setHash] = useState('');
  const [copied, setCopied] = useState(false);

  const generateHash = () => {
    if (!input) {
      setHash(''); // Si no hay texto de entrada, no se genera hash.
      return;
    }

    let generatedHash;
    switch (hashAlgorithm) {
      case 'MD5':
        generatedHash = crypto.MD5(input).toString();
        break;
      case 'SHA-1':
        generatedHash = crypto.SHA1(input).toString();
        break;
      case 'SHA-256':
        generatedHash = crypto.SHA256(input).toString();
        break;
      default:
        generatedHash = '';
    }

    setHash(generatedHash);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(hash).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-16 text-[#d4d4d4]" style={{ backgroundColor: '#1e1e1e' }}>
      <h1 className="text-3xl font-bold mb-6">Hash Generator</h1>
      <p className="text-gray-300 mb-8">
        Genera hashes rápidamente usando algoritmos como <strong>MD5</strong>, <strong>SHA-1</strong>, o <strong>SHA-256</strong>.
      </p>

      {/* Input para el texto */}
      <div className="mb-6">
        <label className="block text-gray-300 font-semibold mb-2">Texto de Entrada:</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Introduce el texto aquí"
          className="w-full h-24 p-4 bg-[#252526] text-gray-200 rounded border border-gray-600 focus:border-[#007ACC] focus:outline-none resize-none"
        />
      </div>

      {/* Selección del algoritmo */}
      <div className="mb-6">
        <label className="block text-gray-300 font-semibold mb-2">Algoritmo de Hash:</label>
        <select
          value={hashAlgorithm}
          onChange={(e) => setHashAlgorithm(e.target.value)}
          className="bg-[#252526] text-gray-200 border border-gray-600 rounded px-4 py-2 focus:border-[#007ACC] focus:outline-none"
        >
          <option value="MD5">MD5</option>
          <option value="SHA-1">SHA-1</option>
          <option value="SHA-256">SHA-256</option>
        </select>
      </div>

      {/* Botón para generar hash */}
      <button
        onClick={generateHash}
        className="mb-6 px-4 py-2 rounded bg-[#007ACC] text-white text-sm hover:bg-[#0587d6] transition"
      >
        Generar Hash
      </button>

      {/* Resultado del hash */}
      {hash && (
        <div className="mb-6">
          <label className="block text-gray-300 font-semibold mb-2">Hash Generado:</label>
          <div className="bg-[#252526] p-4 rounded border border-gray-600 text-gray-300 overflow-auto dark-scroll">
            {hash}
          </div>
          <button
            onClick={copyToClipboard}
            className="mt-4 px-4 py-2 rounded bg-green-600 text-white text-sm hover:bg-green-500 transition"
          >
            {copied ? 'Copiado!' : 'Copiar Hash'}
          </button>
        </div>
      )}
    </div>
  );
}
