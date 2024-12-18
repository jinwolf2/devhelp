import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import io from "socket.io-client"; // Importamos socket.io-client
import axios from "axios";
import {
  TableCellsIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

const socket = io("localhost:3001"); // Conexión al servidor WebSocket

export default function SQLEditor() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [schemas, setSchemas] = useState(null);
  const [loadingSchemas, setLoadingSchemas] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Estado del sidebar
  const [expandedTables, setExpandedTables] = useState({}); // Estado de tablas expandidas
  const [successMessage, setSuccessMessage] = useState("");

  // Función para cargar los schemas
  const fetchSchemas = async () => {
    setLoadingSchemas(true);
    try {
      const response = await axios.get(
        "https://mysqltranning.devhelp.dev/schema"
      );
      setSchemas(response.data.schema);
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

  // Llamada inicial para cargar los schemas
  useEffect(() => {
    fetchSchemas();

    // Configuración del WebSocket para escuchar eventos de actualización
    socket.on("schema-updated", (data) => {
      console.log("Esquema actualizado:", data);
      fetchSchemas(); // Actualizar los schemas al recibir el evento
      setSuccessMessage("Esquema actualizado automáticamente.");
    });

    // Cleanup: desconectar el socket cuando se desmonta el componente
    return () => socket.disconnect();
  }, []);

  // Función para ejecutar consultas
  const executeQuery = async () => {
    setError("");
    setResult(null);
    setSuccessMessage("");

    try {
      const response = await axios.post(
        "https://mysqltranning.devhelp.dev/execute-query",
        { query }
      );

      const isSchemaChangingQuery =
        /^(CREATE|ALTER|DROP|RENAME|TRUNCATE|INSERT|UPDATE|DELETE)/i.test(
          query.trim()
        );

      if (isSchemaChangingQuery) {
        setSuccessMessage(
          "Consulta ejecutada exitosamente. Actualizando esquema..."
        );
        await fetchSchemas(); // Actualizar el esquema después de una consulta que lo cambia
      } else {
        setResult(response.data.data || []);
        setSuccessMessage("Consulta ejecutada exitosamente.");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Error desconocido.");
    }
  };

  // Función para expandir/contraer tablas en el esquema
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
            <span>Esquema</span>
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
              wordWrap: "on",
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

        {/* Mensajes */}
        {successMessage && (
          <div className="mb-4 text-green-500 font-semibold text-center">
            {successMessage}
          </div>
        )}
        {error && (
          <div className="mb-4 text-red-500 font-semibold text-center">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
