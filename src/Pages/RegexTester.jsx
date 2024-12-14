import React, { useState } from "react";

export default function RegexTester() {
  const [regex, setRegex] = useState(""); // Expresión regular
  const [flags, setFlags] = useState(""); // Flags (g, i, m, etc.)
  const [inputText, setInputText] = useState(""); // Texto para probar
  const [matches, setMatches] = useState([]); // Coincidencias
  const [error, setError] = useState(""); // Error de regex
  const [highlightedText, setHighlightedText] = useState(null); // Texto resaltado

  const isValidRegex = (regex, flags) => {
    try {
      new RegExp(regex, flags);
      return true;
    } catch {
      return false;
    }
  };

  const handleValidate = () => {
    setError("");
    setMatches([]);
    setHighlightedText(null);

    if (!isValidRegex(regex, flags)) {
      setError("Expresión o flags no válidos.");
      return;
    }

    try {
      const regExp = new RegExp(regex, flags);
      const matchArray = [...inputText.matchAll(regExp)];
      setMatches(matchArray);

      // Generar texto resaltado
      const highlighted = inputText.split("\n").map((line, index) => (
        <div key={index}>
          {line.split(new RegExp(`(${regex})`, flags)).map((part, i) =>
            part && regExp.test(part) ? (
              <span key={i} className="bg-[#007acc] text-white px-1 rounded">
                {part}
              </span>
            ) : (
              part
            )
          )}
        </div>
      ));
      setHighlightedText(highlighted);
    } catch (err) {
      setError("Error desconocido: " + err.message);
    }
  };

  return (
    <div
      className="w-full max-w-[40rem] mx-auto px-4 py-8 text-[#d4d4d4]"
      style={{ backgroundColor: "#1e1e1e" }}
    >
      <h1 className="text-3xl font-bold mb-6 text-center">Regex Tester</h1>

      {/* Entrada de Regex */}
      <div className="mb-4">
        <label htmlFor="regex" className="block font-semibold mb-2">Expresión Regular:</label>
        <input
          id="regex"
          type="text"
          value={regex}
          onChange={(e) => setRegex(e.target.value)}
          placeholder="Introduce tu regex aquí"
          className="w-full px-4 py-2 h-12 rounded bg-[#252526] text-gray-200 border border-gray-600 focus:border-[#007acc] focus:outline-none"
        />
      </div>

      {/* Entrada de Flags */}
      <div className="mb-4">
        <label htmlFor="flags" className="block font-semibold mb-2">Flags:</label>
        <input
          id="flags"
          type="text"
          value={flags}
          onChange={(e) => setFlags(e.target.value)}
          placeholder="Ejemplo: g, i, m"
          className="w-full px-4 py-2 h-12 rounded bg-[#252526] text-gray-200 border border-gray-600 focus:border-[#007acc] focus:outline-none"
        />
      </div>

      {/* Entrada de Texto */}
      <div className="mb-4">
        <label htmlFor="inputText" className="block font-semibold mb-2">Texto para Probar:</label>
        <textarea
          id="inputText"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          rows="8"
          placeholder="Introduce el texto aquí"
          className="w-full px-4 py-2 rounded bg-[#252526] text-gray-200 border border-gray-600 focus:border-[#007acc] focus:outline-none"
        />
      </div>

      {/* Botón para validar */}
      <div className="mb-6 text-center">
        <button
          onClick={handleValidate}
          className="px-6 py-2 bg-[#007acc] text-white rounded hover:bg-[#0587d6] transition text-lg"
        >
          Validar Regex
        </button>
      </div>

      {/* Resultados */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Resultados:</h2>
        {error ? (
          <p className="text-red-500 font-semibold">{error}</p>
        ) : matches.length > 0 ? (
          <ul className="list-disc pl-5 space-y-1">
            {matches.map((match, index) => (
              <li key={index}>
                <strong>Coincidencia {index + 1}:</strong> "{match[0]}" (Posición: {match.index})
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">Sin coincidencias.</p>
        )}
      </div>

      {/* Texto resaltado con coincidencias */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Texto con Coincidencias:</h2>
        <div className="p-4 rounded bg-[#252526] text-gray-200 border border-gray-600 overflow-auto max-h-96">
          {highlightedText || <p className="text-gray-400">No hay texto resaltado.</p>}
        </div>
      </div>
    </div>
  );
}
