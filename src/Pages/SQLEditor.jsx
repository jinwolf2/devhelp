import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";
import {
  TableCellsIcon,
  ChevronDownIcon,
  ChevronRightIcon
} from "@heroicons/react/24/outline";

export default function SQLEditor() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [schemas, setSchemas] = useState(null);
  const [loadingSchemas, setLoadingSchemas] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Estado del sidebar
  const [expandedTables, setExpandedTables] = useState({}); // Estado de tablas expandidas

  const executeQuery = async () => {
    setError("");
    setResult(null);
    try {
      const response = await axios.post("http://localhost:3001/execute-query", {
        query
      });
      setResult(response.data.data);
    } catch (err) {
      setError(err.response?.data?.error || "Error desconocido.");
    }
  };

  useEffect(() => {
    const fetchSchemas = async () => {
      setLoadingSchemas(true);
      try {
        const response = await axios.get("http://localhost:3001/schema");
        setSchemas(response.data.schema);
        // Inicializar estado de tablas contraídas
        setExpandedTables(
          Object.keys(response.data.schema).reduce((acc, table) => {
            acc[table] = false;
            return acc;
          }, {})
        );
      } catch (err) {
        setError(
          "Error al cargar los schemas: " +
            (err.response?.data?.error || err.message)
        );
      } finally {
        setLoadingSchemas(false);
      }
    };

    fetchSchemas();
  }, []);

  const toggleTable = (tableName) => {
    setExpandedTables((prev) => ({ ...prev, [tableName]: !prev[tableName] }));
  };

  return (
    <div className="flex flex-col sm:flex-row">
      {/* Sidebar */}
      <div
        className={`bg-[#252526] text-gray-200 border-r border-gray-600 sm:w-64 ${
          isSidebarOpen ? "w-full sm:w-64" : "w-0 sm:w-12"
        } transition-all duration-300`}
      >
        <div className="flex items-center justify-between px-4 py-2 bg-[#1e1e1e] border-b border-gray-600">
          <h2 className="text-lg font-semibold flex items-center space-x-2">
            <TableCellsIcon className="h-6 w-6 text-[#007acc]" />
            <span>Fake Company</span>
          </h2>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-sm px-2 py-1 bg-[#007acc] text-white rounded hover:bg-[#0587d6] transition"
          >
            {isSidebarOpen ? "x" : "^"}
          </button>
        </div>
        {isSidebarOpen && (
          <div className="overflow-auto max-h-[calc(100vh-4rem)] p-4">
            {loadingSchemas ? (
              <p className="text-gray-400">Cargando esquema...</p>
            ) : schemas ? (
              <ul className="space-y-4">
                {Object.entries(schemas).map(([tableName, columns]) => (
                  <li key={tableName}>
                    <div
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => toggleTable(tableName)}
                    >
                      <span className="flex items-center space-x-2">
                        <TableCellsIcon className="h-5 w-5 text-[#007acc]" />
                        <strong className="text-[#007acc]">{tableName}</strong>
                      </span>
                      {expandedTables[tableName] ? (
                        <ChevronDownIcon className="h-5 w-5" />
                      ) : (
                        <ChevronRightIcon className="h-5 w-5" />
                      )}
                    </div>
                    {expandedTables[tableName] && (
                      <ul className="list-disc ml-6 text-sm space-y-1 mt-2">
                        {columns.map((column, i) => (
                          <li key={i}>
                            <strong>{column.columnName}</strong> -{" "}
                            {column.dataType} (
                            {column.isNullable === "NO"
                              ? "NOT NULL"
                              : "NULLABLE"}
                            )
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400">No hay esquema disponible.</p>
            )}
          </div>
        )}
      </div>

      {/* Main Editor */}
      <div className="flex-1 p-4">
        <h1 className="text-3xl font-bold mb-6 text-center">SQL Editor</h1>
        <div className="text-gray-300 mb-6 text-center">
          <p>
            Escribe y ejecuta consultas SQL contra tu base de datos compartida.
            Puedes realizar operaciones <strong>SELECT</strong>,{" "}
            <strong>INSERT</strong>, <strong>UPDATE</strong>, y{" "}
            <strong>CREATE TABLE</strong>.
          </p>
          <p className="mt-2">
            <strong>Nota:</strong> La base de datos se restablece cada 24 horas
            y es compartida con otros usuarios, por lo que los cambios no son
            permanentes.
          </p>
        </div>

        {/* Editor de SQL */}
        <div className="mb-6">
          <Editor
            height="40vh"
            defaultLanguage="sql"
            defaultValue="-- Escribe tu consulta SQL aquí"
            onChange={(value) => setQuery(value)}
            theme="vs-dark"
            options={{
              fontSize: 14,
              minimap: { enabled: false },
              wordWrap: "on"
            }}
          />
        </div>

        {/* Botón para ejecutar consulta */}
        <div className="text-center mb-6">
          <button
            onClick={executeQuery}
            className="px-6 py-2 bg-[#007acc] text-white rounded hover:bg-[#0587d6] transition text-lg w-full sm:w-auto"
          >
            Ejecutar Consulta
          </button>
        </div>

        {/* Resultados */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">Resultados:</h2>
          {error ? (
            <p className="text-red-500 font-semibold">{error}</p>
          ) : result ? (
            <div className="overflow-auto max-h-80">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-700 text-white">
                    {Object.keys(result[0] || {}).map((key) => (
                      <th
                        key={key}
                        className="border border-gray-600 px-4 py-2 text-left"
                      >
                        {key}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {result.map((row, index) => (
                    <tr
                      key={index}
                      className="odd:bg-[#252526] even:bg-[#1e1e1e]"
                    >
                      {Object.values(row).map((value, i) => (
                        <td
                          key={i}
                          className="border border-gray-600 px-4 py-2"
                        >
                          {value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-400">No hay resultados para mostrar.</p>
          )}
        </div>
      </div>
    </div>
  );
}
