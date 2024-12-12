import React from 'react';

export default function Documentation() {
  const sections = [
    {
      title: "Introducción",
      content: (
        <>
          <p>
            <strong>DevHelp</strong> es una plataforma de herramientas creadas para simplificar y optimizar las tareas comunes de los desarrolladores. Desde formatear JSON hasta generar Dockerfiles, DevHelp proporciona soluciones rápidas y fáciles de usar.
          </p>
        </>
      ),
    },
    {
      title: "Herramientas Frontend",
      content: (
        <ul className="list-disc pl-6">
          <li>
            <strong>JSON Formatter:</strong> Formatea y valida JSON para depurar estructuras de datos rápidamente.
          </li>
          <li>
            <strong>TS Interface Generator:</strong> Genera interfaces TypeScript a partir de JSON, facilitando el trabajo con tipados.
          </li>
          <li>
            <strong>CSS/JS Minifier:</strong> Minifica archivos CSS y JS para mejorar tiempos de carga.
          </li>
          <li>
            <strong>Color Palette Picker:</strong> Crea paletas de colores personalizadas y expórtalas a TailwindCSS.
          </li>
          <li>
            <strong>Gradient Generator:</strong> Genera gradientes CSS fácilmente y obtén configuraciones listas para usar.
          </li>
        </ul>
      ),
    },
    {
      title: "Herramientas Backend",
      content: (
        <ul className="list-disc pl-6">
          <li>
            <strong>JWT Decoder:</strong> Decodifica y analiza tokens JWT para comprender su contenido.
          </li>
          <li>
            <strong>Hash Generator:</strong> Genera hashes utilizando algoritmos MD5, SHA-1 o SHA-256.
          </li>
          <li>
            <strong>SQL &lt;-&gt; JSON Converter:</strong> Convierte datos entre JSON y SQL para migraciones y pruebas.
          </li>
          <li>
            <strong>UUID Generator:</strong> Genera identificadores únicos (UUID) en versiones v1 y v4.
          </li>
          <li>
            <strong>Dockerfile Template Generator:</strong> Crea Dockerfiles personalizados y configuraciones adicionales como `.dockerignore` o `docker-compose.yml`.
          </li>
        </ul>
      ),
    },
    {
      title: "Características Adicionales",
      content: (
        <ul className="list-disc pl-6">
          <li>
            <strong>Multi-stage Builds:</strong> Genera Dockerfiles con múltiples etapas para optimizar el tamaño de las imágenes.
          </li>
          <li>
            <strong>Exportación:</strong> Descarga resultados en archivos como Dockerfiles, JSON, o `docker-compose.yml`.
          </li>
          <li>
            <strong>Resaltado de Sintaxis:</strong> Utiliza `react-syntax-highlighter` para mostrar resultados con resaltado.
          </li>
        </ul>
      ),
    },
    {
      title: "Cómo Usar",
      content: (
        <ol className="list-decimal pl-6">
          <li>Selecciona una herramienta desde la pestaña "Frontend" o "Backend" en la página de herramientas.</li>
          <li>Proporciona los datos requeridos (por ejemplo, JSON para formatear o texto para generar un hash).</li>
          <li>Haz clic en el botón correspondiente para generar el resultado.</li>
          <li>Exporta o copia el resultado según sea necesario.</li>
        </ol>
      ),
    },
    {
      title: "Tecnologías Utilizadas",
      content: (
        <ul className="list-disc pl-6">
          <li>React.js para la interfaz de usuario.</li>
          <li>TailwindCSS para estilos rápidos y consistentes.</li>
          <li>react-syntax-highlighter para resaltado de sintaxis en JSON y código.</li>
          <li>uuid y crypto-js para generación de UUIDs y hashes.</li>
        </ul>
      ),
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-16 text-[#d4d4d4]" style={{ backgroundColor: '#1e1e1e' }}>
      <h1 className="text-4xl font-bold mb-8">Documentación</h1>
      {sections.map((section, index) => (
        <div key={index} className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
          <div className="text-gray-300 text-base leading-relaxed">{section.content}</div>
        </div>
      ))}
    </div>
  );
}
