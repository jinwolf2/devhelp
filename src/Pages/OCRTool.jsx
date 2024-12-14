import React, { useState } from "react";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import Tesseract from "tesseract.js";

export default function OCRTool() {
  const [imageFile, setImageFile] = useState(null);
  const [extractedText, setExtractedText] = useState("");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(URL.createObjectURL(file));
      setExtractedText("");
      setProgress(0);
      setError("");
    }
  };

  const handleExtractText = () => {
    if (!imageFile) {
      setError("Por favor, selecciona una imagen primero.");
      return;
    }

    setError("");
    setProgress(0);

    Tesseract.recognize(imageFile, "eng", {
      logger: (m) => {
        if (m.status === "recognizing text") {
          setProgress(Math.round(m.progress * 100));
        }
      },
    })
      .then(({ data: { text } }) => {
        setExtractedText(text);
        setProgress(100);
      })
      .catch((err) => {
        setError("Ocurrió un error al procesar la imagen.");
        console.error(err);
      });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-[#d4d4d4]" style={{ backgroundColor: "#1e1e1e" }}>
      <h1 className="text-3xl font-bold mb-6 text-center">OCR Tool</h1>

      {/* Formulario de Subida */}
      <div className="mb-6 mx-auto w-full  sm:w-96">
        <label
          htmlFor="fileInput"
          className="flex flex-col items-center justify-center w-full h-40 sm:h-48 border-2 border-dashed rounded-lg cursor-pointer bg-[#252526] text-gray-200 border-gray-600 hover:border-[#007acc] transition"
        >
          {imageFile ? (
            <img
              src={imageFile}
              alt="Seleccionada"
              className="max-h-36 object-contain rounded"
            />
          ) : (
            <>
              <ArrowUpTrayIcon className="w-12 h-12 sm:w-16 sm:h-16 mb-2 text-gray-400" />
              <p className="text-sm sm:text-base text-gray-400 text-center p-2">
                Arrastra y suelta tu imagen aquí o{" "}
                <span className="text-[#007acc] font-semibold">haz clic</span>
              </p>
            </>
          )}
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>
      </div>

      {/* Botón para Extraer Texto */}
      <div className="mb-4 text-center">
        <button
          onClick={handleExtractText}
          className="px-6 py-2 bg-[#007acc] text-white rounded hover:bg-[#0587d6] transition "
        >
          Extraer Texto
        </button>
      </div>

      {/* Barra de Progreso */}
      {progress > 0 && progress < 100 && (
        <div className="mb-4">
          <p className="text-gray-400 text-sm sm:text-base">Progreso: {progress}%</p>
          <div className="w-full bg-gray-700 rounded h-2 sm:h-3 overflow-hidden">
            <div
              className="bg-[#007acc] h-2 sm:h-3 rounded"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Resultado del OCR */}
      <div className="mb-4">
        <h2 className="text-xl sm:text-2xl font-semibold mb-2">Texto Extraído:</h2>
        {error ? (
          <p className="text-red-500 font-semibold">{error}</p>
        ) : (
          <div className="p-2 rounded bg-[#252526] text-gray-200 border border-gray-600 max-h-60 sm:max-h-80 overflow-auto">
            {extractedText || <p className="text-gray-400">No se ha extraído texto aún.</p>}
          </div>
        )}
      </div>
    </div>
  );
}
