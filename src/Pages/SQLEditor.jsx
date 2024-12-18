import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import io from "socket.io-client";
import axios from "axios";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  PlayIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";

// Conecta con el servidor Socket.io
const socket = io("https://mysqltranning.devhelp.dev");

export default function SQLEditor() {
  // Estado para la consulta actual
  const [query, setQuery] = useState("");
  // Estado para el resultado (puede ser un array de resultados)
  const [result, setResult] = useState([]);
  // Estado para manejar mensajes de error
  const [error, setError] = useState("");
  // Estado para el esquema de la base de datos
  const [schemas, setSchemas] = useState({});
  // Estado para manejar qué tablas están expandidas
  const [expandedTables, setExpandedTables] = useState({});
  // Estado para mensajes de éxito (por ejemplo: "Consulta ejecutada exitosamente")
  const [successMessage, setSuccessMessage] = useState("");
  // Estado para almacenar la IP pública del cliente
  const [publicIp, setPublicIp] = useState("");

  // Función para obtener el esquema de la base de datos
  const fetchSchemas = async () => {
    try {
      const response = await axios.get("https://mysqltranning.devhelp.dev/schema");
      setSchemas(response.data.schema);

      // Inicializamos el estado de expansión de tablas en false
      setExpandedTables(
        Object.keys(response.data.schema).reduce((acc, table) => {
          acc[table] = false;
          return acc;
        }, {})
      );
    } catch (err) {
      setError("Error al cargar el esquema: " + err.message);
    }
  };

  // Obtener la IP pública del cliente desde un servicio externo
  useEffect(() => {
    fetch("https://api.ipify.org?format=json")
      .then((res) => res.json())
      .then((data) => {
        setPublicIp(data.ip);
        console.log("IP pública obtenida:", data.ip); // Log para debug
      })
      .catch((err) => console.error("Error obteniendo la IP pública:", err));
  }, []);

  // Montar el esquema y establecer escucha de "schema-updated" vía sockets
  useEffect(() => {
    fetchSchemas();
    socket.on("schema-updated", () => {
      fetchSchemas();
      setSuccessMessage("El esquema se actualizó automáticamente.");
    });
    return () => socket.off("schema-updated");
  }, []);

  // Ejecutar la consulta SQL enviada por el usuario
  const executeQuery = async () => {
    setError("");
    setSuccessMessage("");
    setResult([]);
    try {
      // Enviamos la consulta y la IP pública al backend
      const response = await axios.post(
        "https://mysqltranning.devhelp.dev/execute-query",
        { query, clientIp: publicIp }
      );
      const data = response.data.data || [];
      setResult(data);
      setSuccessMessage("Consulta ejecutada exitosamente.");
    } catch (err) {
      setError(err.response?.data?.error || "Error al ejecutar la consulta.");
    }
  };

  // Alternar la visualización de las columnas de una tabla en el sidebar
  const toggleTable = (tableName) => {
    setExpandedTables((prev) => ({
      ...prev,
      [tableName]: !prev[tableName],
    }));
  };

  // Función auxiliar para renderizar un conjunto de resultados
  const renderResultSet = (rows, index = null) => {
    // rows puede ser:
    // - Un array vacío (no hay resultados)
    // - Un array de objetos (resultado de SELECT)
    // - Un array con un "OkPacket" (resultado de UPDATE/INSERT/DELETE)
    // - Un objeto no array, que convertiremos a JSON

    if (!Array.isArray(rows)) {
      // Si no es un array, lo mostramos como JSON
      return (
        <div className="rounded border border-[#333333] mb-4 p-2 text-white">
          {index !== null && (
            <h3 className="font-semibold mb-2">Resultado {index + 1}:</h3>
          )}
          <p>{JSON.stringify(rows)}</p>
        </div>
      );
    }

    if (rows.length === 0) {
      // Sin filas
      return (
        <div className="rounded border border-[#333333] mb-4 p-2 text-gray-400">
          {index !== null && (
            <h3 className="text-white font-semibold mb-2">Resultado {index + 1}:</h3>
          )}
          No hay resultados para mostrar.
        </div>
      );
    }

    // Si el primer elemento es un "OkPacket" (UPDATE/INSERT)
    const first = rows[0];
    if (
      typeof first === "object" &&
      (Object.hasOwn(first, "affectedRows") || Object.hasOwn(first, "insertId"))
    ) {
      // Mostrar filas afectadas
      return (
        <div className="rounded border border-[#333333] mb-4 p-2 text-white">
          {index !== null && (
            <h3 className="font-semibold mb-2">Resultado {index + 1}:</h3>
          )}
          <p>Consulta ejecutada. Filas afectadas: {first.affectedRows ?? 0}</p>
        </div>
      );
    }

    // Caso general: resultado de SELECT
    const keys = Object.keys(first);
    return (
      <div className="overflow-auto rounded border border-[#333333] mb-4">
        {index !== null && (
          <h3 className="text-white font-semibold mb-2 p-2 bg-[#252525] border-b border-[#333333]">
            Resultado {index + 1}:
          </h3>
        )}
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-[#333333] text-white">
              {keys.map((key) => (
                <th
                  key={key}
                  className="px-3 py-2 text-left border-b border-[#2a2a2a]"
                >
                  {key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={i}
                className="odd:bg-[#2a2a2a] even:bg-[#252525] hover:bg-[#333333] transition"
              >
                {Object.values(row).map((value, index) => (
                  <td
                    key={index}
                    className="px-3 py-2 truncate border-b border-[#2a2a2a]"
                  >
                    {typeof value === "object" && value !== null
                      ? JSON.stringify(value)
                      : value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  // Verificar si hay múltiples resultados
  const isMultipleResults = Array.isArray(result) && result.length > 0 && Array.isArray(result[0]);

  return (
    <div className="h-screen flex flex-col bg-[#1e1e1e] text-gray-200">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-[#252526] border-b border-[#333333]">
        <h1 className="text-xl font-semibold text-white flex items-center space-x-2">
          <span>SQL Playground</span>
        </h1>

        <button
          onClick={executeQuery}
          className="flex items-center space-x-2 px-5 py-2 bg-[#007acc] rounded hover:bg-[#0587d6] text-white transition font-medium"
          title="Ejecutar Consulta"
        >
          <PlayIcon className="h-5 w-5" />
          <span>Ejecutar</span>
        </button>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-[#252526] flex flex-col border-r border-[#333333] overflow-hidden">
          <div className="p-4 flex items-center space-x-2 bg-[#007acc] text-white">
            <Squares2X2Icon className="h-5 w-5" />
            <h2 className="text-lg font-semibold">Esquema</h2>
          </div>
          <div className="overflow-auto flex-1">
            {Object.entries(schemas).map(([table, columns]) => (
              <div key={table}>
                <div
                  onClick={() => toggleTable(table)}
                  className="flex items-center justify-between p-2 hover:bg-[#333333] cursor-pointer"
                >
                  <span className="truncate text-sm">{table}</span>
                  {expandedTables[table] ? (
                    <ChevronDownIcon className="h-4 w-4" />
                  ) : (
                    <ChevronRightIcon className="h-4 w-4" />
                  )}
                </div>
                {expandedTables[table] && (
                  <ul className="pl-4 pb-2 text-xs text-gray-400 space-y-1">
                    {columns.map((col, index) => (
                      <li key={index} className="truncate">
                        {col.columnName} ({col.dataType})
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex flex-col flex-1">
          {/* Editor Section */}
          <div className="flex-1 flex flex-col border-b border-[#333333]">
            <div className="flex-1 relative">
              <Editor
                height="100%"
                defaultLanguage="sql"
                defaultValue="-- Escribe tu consulta SQL aquí"
                onChange={(value) => setQuery(value)}
                theme="vs-dark"
              />
            </div>
          </div>

          {/* Results Section */}
          <div className="h-64 overflow-auto bg-[#1e1e1e] p-4">
            <h2 className="text-lg font-semibold mb-2 text-white">Resultados:</h2>
            {error && <p className="text-red-500 mb-2">{error}</p>}
            {successMessage && <p className="text-green-500 mb-2">{successMessage}</p>}

            {Array.isArray(result) && result.length > 0 ? (
              isMultipleResults ? (
                // Múltiples conjuntos de resultados
                result.map((rows, idx) => renderResultSet(rows, idx))
              ) : (
                // Un solo conjunto de resultados
                renderResultSet(result)
              )
            ) : (
              <p className="text-gray-400">No hay resultados para mostrar.</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
