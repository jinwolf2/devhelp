import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './Components/Navbar';
import Footer from './Components/Footer';
import Documentation from './Pages/Documentation';
import Apoyo from './Pages/Apoyo';
import Home from './Pages/Home';
import Tools from './Pages/Tools';
import JsonFormat from './Pages/JsonFormat';
import TSInterfaceGenerator from './Pages/TSInterfaceGenerator';
import CssJsMinifier from './Pages/CssJsMinifier';
import ColorPalettePicker from './Pages/ColorPalettePicker';
import GradientGenerator from './Pages/GradientGenerator';
import JWTDecoder from './Pages/JWTDecoder';
import HashGenerator from './Pages/HashGenerator';
import SQLJSONConverter from './Pages/SQLJSONConverter';
import UUIDGenerator from './Pages/UUIDGenerator';
import DockerfileGenerator from './Pages/DockerfileGenerator';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#1e1e1e', color: '#d4d4d4' }}>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/tools/f/jsonformat" element={<JsonFormat />} />
          <Route path="/tools/f/TSgeneration" element={<TSInterfaceGenerator />} />
          <Route path="/tools/f/CSSJSmini" element={<CssJsMinifier />} />
          <Route path="/tools/f/ColorPalettePicker" element={<ColorPalettePicker />} />
          <Route path="/tools/f/GradientGenerator" element={<GradientGenerator />} />
          <Route path="/tools/b/JWTDecoder" element={<JWTDecoder />} />
          <Route path="/tools/b/HashGenerator" element={<HashGenerator />} />
          <Route path="/tools/b/SQLtoJSON" element={<SQLJSONConverter />} />
          <Route path="/tools/b/UUIDGenerator" element={<UUIDGenerator />} />
          <Route path="/tools/b/DockerTemplateGen" element={<DockerfileGenerator />} />
          <Route path="/docs" element={<Documentation />} />
          <Route path="/support" element={<Apoyo />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
