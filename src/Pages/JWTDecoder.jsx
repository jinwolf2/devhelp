import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function JWTDecoder() {
  const [jwt, setJwt] = useState('');
  const [decoded, setDecoded] = useState(null);
  const [error, setError] = useState('');

  const decodeJWT = () => {
    try {
      setError('');
      const parts = jwt.split('.');
      if (parts.length !== 3) {
        throw new Error('El token JWT debe tener tres partes separadas por puntos.');
      }

      const [header, payload, signature] = parts;
      const decodedHeader = JSON.parse(atob(header));
      const decodedPayload = JSON.parse(atob(payload));

      setDecoded({
        header: decodedHeader,
        payload: decodedPayload,
        signature,
      });
    } catch (err) {
      setDecoded(null);
      setError(err.message || 'El token JWT no es válido.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-16 text-[#d4d4d4]" style={{ backgroundColor: '#1e1e1e' }}>
      <h1 className="text-3xl font-bold mb-6">JWT Decoder</h1>
      <p className="text-gray-300 mb-8">
        Decodifica y analiza tokens JWT. Examina su <strong>header</strong>, <strong>payload</strong>, y <strong>signature</strong>.
      </p>

      {/* Input para el JWT */}
      <div className="mb-6">
        <label className="block text-gray-300 font-semibold mb-2">Token JWT:</label>
        <textarea
          value={jwt}
          onChange={(e) => setJwt(e.target.value)}
          placeholder="Introduce tu token JWT aquí"
          className="w-full h-24 p-4 bg-[#252526] text-gray-200 rounded border border-gray-600 focus:border-[#007ACC] focus:outline-none resize-none"
        />
        <button
          onClick={decodeJWT}
          className="mt-4 px-4 py-2 rounded bg-[#007ACC] text-white text-sm hover:bg-[#0587d6] transition"
        >
          Decodificar
        </button>
      </div>

      {/* Resultados */}
      {error && (
        <div className="text-red-500 text-sm font-semibold mt-4">
          {error}
        </div>
      )}

      {decoded && (
        <div className="mt-8 space-y-6">
          {/* Header */}
          <div>
            <h3 className="text-xl font-bold mb-2 text-[#d4d4d4]">Header</h3>
            <div className="bg-[#252526] p-4 rounded border border-gray-600 overflow-auto dark-scroll">
              <SyntaxHighlighter
                language="json"
                style={vscDarkPlus}
                customStyle={{ backgroundColor: 'transparent', margin: 0, padding: 0 }}
              >
                {JSON.stringify(decoded.header, null, 2)}
              </SyntaxHighlighter>
            </div>
          </div>

          {/* Payload */}
          <div>
            <h3 className="text-xl font-bold mb-2 text-[#d4d4d4]">Payload</h3>
            <div className="bg-[#252526] p-4 rounded border border-gray-600 overflow-auto dark-scroll">
              <SyntaxHighlighter
                language="json"
                style={vscDarkPlus}
                customStyle={{ backgroundColor: 'transparent', margin: 0, padding: 0 }}
              >
                {JSON.stringify(decoded.payload, null, 2)}
              </SyntaxHighlighter>
            </div>
          </div>

          {/* Signature */}
          <div>
            <h3 className="text-xl font-bold mb-2 text-[#d4d4d4]">Signature</h3>
            <div className="bg-[#252526] p-4 rounded border border-gray-600 text-gray-300 text-sm overflow-auto">
              {decoded.signature}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
