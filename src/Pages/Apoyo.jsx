import React from 'react';

export default function Apoyo() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16 text-[#d4d4d4]" style={{ backgroundColor: '#1e1e1e' }}>
      <h1 className="text-3xl font-bold mb-6 text-center">Apoya el Proyecto</h1>
      <p className="text-gray-300 mb-8 text-center">
        Si este proyecto te resulta útil y quieres apoyarlo, considera hacer una donación.
        Toda contribución ayuda a mantener y mejorar esta plataforma para la comunidad.
      </p>

      <div className="flex flex-col items-center">
        <div className="mb-6 text-center flex flex-col items-center">
          <img 
            src="/img/stellar.svg" 
            alt="Stellar Lumens Logo" 
            className="w-24 h-24 mb-4"
          />
          <h2 className="text-xl font-semibold mb-2">Billetera Stellar Lumens</h2>
          <p className="bg-[#252526] text-gray-200 px-4 w-auto py-2 rounded border border-gray-600 text-sm">
            GAKZXJVMXJ6GEYN666WNK5ROHWLWK7Q3EQNWIWN3TEAHWDCNXGRGEGIP
          </p>
        </div>

        <button
          onClick={() => navigator.clipboard.writeText('GAKZXJVMXJ6GEYN666WNK5ROHWLWK7Q3EQNWIWN3TEAHWDCNXGRGEGIP')}
          className="px-6 py-2 bg-[#007acc] text-white rounded hover:bg-[#0587d6] transition text-lg"
        >
          Copiar Dirección
        </button>

        <p className="mt-6 text-gray-400 text-sm text-center max-w-lg">
          ¡Gracias por tu apoyo! Con tu contribución, podemos seguir desarrollando herramientas útiles para la comunidad de desarrolladores. ❤️
        </p>
      </div>
    </div>
  );
}
