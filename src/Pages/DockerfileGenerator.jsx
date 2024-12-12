import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function DockerfileGenerator() {
  const [baseImage, setBaseImage] = useState('node');
  const [version, setVersion] = useState('16');
  const [workdir, setWorkdir] = useState('/app');
  const [commands, setCommands] = useState([{ type: 'RUN', value: 'npm install' }]);
  const [exposePort, setExposePort] = useState('3000');
  const [startCommand, setStartCommand] = useState('npm start');
  const [multiStage, setMultiStage] = useState(false);
  const [composeConfig, setComposeConfig] = useState(false);

  const addCommand = (type) => {
    setCommands([...commands, { type, value: '' }]);
  };

  const updateCommand = (index, value) => {
    const newCommands = [...commands];
    newCommands[index].value = value;
    setCommands(newCommands);
  };

  const removeCommand = (index) => {
    setCommands(commands.filter((_, i) => i !== index));
  };

  const generateDockerfile = () => {
    const stage1 = `
# Etapa 1: Construcción
FROM ${baseImage}:${version} as build
WORKDIR ${workdir}
COPY . ${workdir}
${commands.filter((cmd) => cmd.type === 'RUN').map((cmd) => `${cmd.type} ${cmd.value}`).join('\n')}
    `.trim();

    const stage2 = `
# Etapa 2: Producción
FROM nginx:latest
WORKDIR /usr/share/nginx/html
COPY --from=build ${workdir}/build .
EXPOSE ${exposePort}
CMD ["nginx", "-g", "daemon off;"]
    `.trim();

    return multiStage ? `${stage1}\n\n${stage2}` : `
FROM ${baseImage}:${version}
WORKDIR ${workdir}
COPY . ${workdir}
${commands.map((cmd) => `${cmd.type} ${cmd.value}`).join('\n')}
EXPOSE ${exposePort}
CMD ["${startCommand.split(' ')[0]}", "${startCommand.split(' ').slice(1).join(' ')}"]
    `.trim();
  };

  const generateCompose = () => `
version: '3.8'
services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "${exposePort}:${exposePort}"
    environment:
      - NODE_ENV=production
`;

  const generateDockerIgnore = () => `
node_modules
.git
*.log
build
dist
.DS_Store
`;

  const downloadFile = (content, fileName) => {
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = fileName;
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-16 text-[#d4d4d4]" style={{ backgroundColor: '#1e1e1e' }}>
      <h1 className="text-3xl font-bold mb-6">Dockerfile Template Generator</h1>
      <p className="text-gray-300 mb-8">
        Genera Dockerfiles personalizados con múltiples etapas, optimización, y configuración avanzada.
      </p>

      {/* Opciones básicas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
        <div>
          <label className="block text-gray-300 font-semibold mb-2">Imagen Base:</label>
          <select
            value={baseImage}
            onChange={(e) => setBaseImage(e.target.value)}
            className="w-full bg-[#252526] text-gray-200 border border-gray-600 rounded px-4 py-2 focus:border-[#007ACC] focus:outline-none"
          >
            <option value="node">Node.js</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="nginx">Nginx</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-300 font-semibold mb-2">Versión:</label>
          <input
            type="text"
            value={version}
            onChange={(e) => setVersion(e.target.value)}
            placeholder="Versión de la imagen"
            className="w-full bg-[#252526] text-gray-200 border border-gray-600 rounded px-4 py-2 focus:border-[#007ACC] focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-300 font-semibold mb-2">Directorio de Trabajo:</label>
          <input
            type="text"
            value={workdir}
            onChange={(e) => setWorkdir(e.target.value)}
            placeholder="/app"
            className="w-full bg-[#252526] text-gray-200 border border-gray-600 rounded px-4 py-2 focus:border-[#007ACC] focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-300 font-semibold mb-2">Puerto Expuesto:</label>
          <input
            type="text"
            value={exposePort}
            onChange={(e) => setExposePort(e.target.value)}
            placeholder="3000"
            className="w-full bg-[#252526] text-gray-200 border border-gray-600 rounded px-4 py-2 focus:border-[#007ACC] focus:outline-none"
          />
        </div>
      </div>

      {/* Comandos personalizados */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Comandos Personalizados:</h2>
        {commands.map((cmd, index) => (
          <div key={index} className="flex items-center mb-4">
            <select
              value={cmd.type}
              onChange={(e) => updateCommand(index, e.target.value)}
              className="bg-[#252526] text-gray-200 border border-gray-600 rounded px-2 py-1 focus:border-[#007ACC] focus:outline-none"
            >
              <option value="RUN">RUN</option>
              <option value="COPY">COPY</option>
              <option value="ENV">ENV</option>
            </select>
            <input
              type="text"
              value={cmd.value}
              onChange={(e) => updateCommand(index, e.target.value)}
              placeholder="Comando"
              className="flex-1 ml-4 bg-[#252526] text-gray-200 border border-gray-600 rounded px-4 py-2 focus:border-[#007ACC] focus:outline-none"
            />
            <button
              onClick={() => removeCommand(index)}
              className="ml-4 bg-red-600 text-white px-2 py-1 rounded hover:bg-red-500 transition"
            >
              Eliminar
            </button>
          </div>
        ))}
        <button
          onClick={() => addCommand('RUN')}
          className="px-4 py-2 bg-[#007ACC] text-white rounded hover:bg-[#0587d6] transition"
        >
          Añadir Comando
        </button>
      </div>

      {/* Opciones avanzadas */}
      <div className="mb-6 flex items-center">
        <label className="mr-4 text-gray-300 font-semibold">Multi-stage Builds:</label>
        <input
          type="checkbox"
          checked={multiStage}
          onChange={(e) => setMultiStage(e.target.checked)}
          className="form-checkbox h-5 w-5 text-[#007ACC]"
        />
      </div>

      <div className="mb-6 flex items-center">
        <label className="mr-4 text-gray-300 font-semibold">Generar docker-compose.yml:</label>
        <input
          type="checkbox"
          checked={composeConfig}
          onChange={(e) => setComposeConfig(e.target.checked)}
          className="form-checkbox h-5 w-5 text-[#007ACC]"
        />
      </div>

      {/* Dockerfile generado */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Dockerfile Generado:</h2>
        <div className="bg-[#252526] p-4 rounded border border-gray-600 overflow-auto dark-scroll">
          <SyntaxHighlighter
            language="dockerfile"
            style={vscDarkPlus}
            customStyle={{ backgroundColor: 'transparent', margin: 0, padding: 0 }}
          >
            {generateDockerfile()}
          </SyntaxHighlighter>
        </div>
      </div>

      {composeConfig && (
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4">docker-compose.yml Generado:</h2>
          <div className="bg-[#252526] p-4 rounded border border-gray-600 overflow-auto dark-scroll">
            <SyntaxHighlighter
              language="yaml"
              style={vscDarkPlus}
              customStyle={{ backgroundColor: 'transparent', margin: 0, padding: 0 }}
            >
              {generateCompose()}
            </SyntaxHighlighter>
          </div>
        </div>
      )}

      {/* Botones para exportar */}
      <div className="space-x-4">
        <button
          onClick={() => downloadFile(generateDockerfile(), 'Dockerfile')}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500 transition"
        >
          Descargar Dockerfile
        </button>
        {composeConfig && (
          <button
            onClick={() => downloadFile(generateCompose(), 'docker-compose.yml')}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500 transition"
          >
            Descargar docker-compose.yml
          </button>
        )}
        <button
          onClick={() => downloadFile(generateDockerIgnore(), '.dockerignore')}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500 transition"
        >
          Descargar .dockerignore
        </button>
      </div>
    </div>
  );
}
