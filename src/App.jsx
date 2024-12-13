import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './Components/Navbar';
import Footer from './Components/Footer';

// Lazy loading de componentes
const Home = React.lazy(() => import('./Pages/Home'));
const Tools = React.lazy(() => import('./Pages/Tools'));
const JsonFormat = React.lazy(() => import('./Pages/JsonFormat'));
const TSInterfaceGenerator = React.lazy(() => import('./Pages/TSInterfaceGenerator'));
const CssJsMinifier = React.lazy(() => import('./Pages/CssJsMinifier'));
const ColorPalettePicker = React.lazy(() => import('./Pages/ColorPalettePicker'));
const GradientGenerator = React.lazy(() => import('./Pages/GradientGenerator'));
const JWTDecoder = React.lazy(() => import('./Pages/JWTDecoder'));
const HashGenerator = React.lazy(() => import('./Pages/HashGenerator'));
const SQLJSONConverter = React.lazy(() => import('./Pages/SQLJSONConverter'));
const UUIDGenerator = React.lazy(() => import('./Pages/UUIDGenerator'));
const DockerfileGenerator = React.lazy(() => import('./Pages/DockerfileGenerator'));

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#1e1e1e', color: '#d4d4d4' }}>
        <NavBar />
        <Suspense fallback={<div className="text-center mt-10">Cargando...</div>}>
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
          </Routes>
        </Suspense>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
