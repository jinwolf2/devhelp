import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function DockerfileGenerator() {
  const [baseImage, setBaseImage] = useState('node');
  const [version, setVersion] = useState('16');
  const [workdir, setWorkdir] = useState('/app');
  const [commands, setCommands] = useState([{ type: 'RUN', value: 'apt-get update && apt-get install -y curl' }]);
  const [exposePort, setExposePort] = useState('3000');
  const [startCommand, setStartCommand] = useState('npm start');
  const [multiStage, setMultiStage] = useState(false);
  const [dockerfileContent, setDockerfileContent] = useState('');
  const [composeConfig, setComposeConfig] = useState(false);

  // Configuración de comandos predeterminados
  const defaultCommands = {
    node: 'npm install',
    python: 'pip install -r requirements.txt',
    java: 'apt-get install -y openjdk-11-jdk',
    ubuntu: 'apt-get update && apt-get install -y curl',
    debian: 'apt-get update && apt-get install -y curl',
  };

  const defaultCMD = {
    node: 'npm start',
    python: 'python app.py',
    java: 'java -jar app.jar',
    ubuntu: '/bin/bash',
    debian: '/bin/bash',
  };

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

    const finalDockerfile = multiStage
      ? `${stage1}\n\n${stage2}`
      : `
FROM ${baseImage}:${version}
WORKDIR ${workdir}
COPY . ${workdir}
${commands.map((cmd) => `${cmd.type} ${cmd.value}`).join('\n')}
EXPOSE ${exposePort}
CMD ["${startCommand.split(' ')[0]}", "${startCommand.split(' ').slice(1).join(' ')}"]
    `.trim();

    setDockerfileContent(finalDockerfile);
    return finalDockerfile;
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
`;

  return (
    <div className="max-w-6xl mx-auto px-4 py-16 text-[#d4d4d4]" style={{ backgroundColor: '#1e1e1e' }}>
      <h1 className="text-3xl font-bold mb-6 text-center">Dockerfile Template Generator</h1>

      {/* Opciones básicas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
        <div>
          <label className="block mb-2 font-semibold">Imagen Base:</label>
          <select
            value={baseImage}
            onChange={(e) => {
              setBaseImage(e.target.value);
              setStartCommand(defaultCMD[e.target.value]);
              setCommands([{ type: 'RUN', value: defaultCommands[e.target.value] }]);
            }}
            className="w-full bg-[#252526] text-gray-200 border border-gray-600 px-4 py-2 rounded focus:outline-none"
          >
            <option value="node">Node.js</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="ubuntu">Ubuntu</option>
            <option value="debian">Debian</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 font-semibold">Versión:</label>
          <input
            type="text"
            value={version}
            onChange={(e) => setVersion(e.target.value)}
            className="w-full bg-[#252526] text-gray-200 border border-gray-600 px-4 py-2 rounded focus:outline-none"
          />
        </div>
      </div>

      {/* Generar Dockerfile */}
      <div className="mb-6">
        <button
          onClick={generateDockerfile}
          className="px-6 py-2 bg-[#007ACC] text-white rounded hover:bg-[#0587d6] transition"
        >
          Generar Dockerfile
        </button>
      </div>

      {/* Dockerfile editable */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Dockerfile Generado:</h2>
        <div className="bg-[#252526] p-4 rounded border border-gray-600">
          <SyntaxHighlighter
            language="dockerfile"
            style={vscDarkPlus}
            customStyle={{ backgroundColor: 'transparent' }}
            contentEditable
          >
            {dockerfileContent}
          </SyntaxHighlighter>
        </div>
      </div>

      {/* Opciones avanzadas */}
      <div className="mb-6 flex items-center">
        <label className="mr-4">Multi-stage Builds:</label>
        <input
          type="checkbox"
          checked={multiStage}
          onChange={(e) => setMultiStage(e.target.checked)}
          className="form-checkbox h-5 w-5 text-[#007ACC]"
        />
      </div>

      {/* docker-compose */}
      {composeConfig && (
        <div>
          <h2 className="text-xl font-bold mb-4">docker-compose.yml Generado:</h2>
          <div className="bg-[#252526] p-4 rounded border border-gray-600">
            <SyntaxHighlighter
              language="yaml"
              style={vscDarkPlus}
              customStyle={{ backgroundColor: 'transparent' }}
            >
              {generateCompose()}
            </SyntaxHighlighter>
          </div>
        </div>
      )}
    </div>
  );
}
