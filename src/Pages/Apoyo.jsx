import React from 'react';

export default function Apoyo() {
  return (
    <div 
      className="max-w-6xl mx-auto px-4 py-16 text-[#d4d4d4] sm:px-6 md:px-8"
      style={{ backgroundColor: '#1e1e1e' }}
    >
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-center">
        Apoya el Proyecto
      </h1>
      <p className="text-gray-300 mb-8 text-center text-sm sm:text-base md:text-lg">
        Si este proyecto te resulta útil y quieres apoyarlo, considera hacer una donación.
        Toda contribución ayuda a mantener y mejorar esta plataforma para la comunidad.
      </p>

      <div className="flex flex-col items-center">
        <div className="mb-6 text-center flex flex-col items-center">
          <img 
            src="/img/stellar.svg" 
            alt="Stellar Lumens Logo" 
            className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 mb-4"
          />
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2">
            Billetera Stellar Lumens
          </h2>
          <p className="bg-[#252526] text-gray-200 px-4 py-2 rounded border border-gray-600 text-xs sm:text-sm md:text-base break-all">
            GAKZXJVMXJ6GEYN666WNK5ROHWLWK7Q3EQNWIWN3TEAHWDCNXGRGEGIP
          </p>
        </div>

        <button
          onClick={() => navigator.clipboard.writeText('GAKZXJVMXJ6GEYN666WNK5ROHWLWK7Q3EQNWIWN3TEAHWDCNXGRGEGIP')}
          className="px-4 py-2 sm:px-6 sm:py-2 bg-[#007acc] text-white rounded hover:bg-[#0587d6] transition text-sm sm:text-lg"
        >
          Copiar Dirección
        </button>

        <p className="mt-6 text-gray-400 text-xs sm:text-sm md:text-base text-center max-w-lg">
          ¡Gracias por tu apoyo! Con tu contribución, podemos seguir desarrollando herramientas útiles para la comunidad de desarrolladores. ❤️
        </p>
      </div>
    </div>
  );
}
