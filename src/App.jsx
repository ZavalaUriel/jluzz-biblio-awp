import { useEffect, useRef, useState } from 'react';
import Encabezado from './components/Encabezado.jsx';
import Galeria from './components/Galeria.jsx';
import PWABadge from './PWABadge.jsx';
import { CANTIDAD, cargarFotos, filtrarPorCategoria, filtrarPorTexto } from './biblioteca.js';
import './App.css';

function App() {
  const [fotos, setFotos] = useState([]);
  const [categoria, setCategoria] = useState('todas');
  const [texto, setTexto] = useState('');
  const [cargando, setCargando] = useState(true);
  const [segundos, setSegundos] = useState(3);
  const [error, setError] = useState('');
  const relojRef = useRef(null);

  useEffect(() => {
    async function cargar() {
      try {
        setFotos(await cargarFotos(CANTIDAD));
      } catch (err) {
        setError(err.message);
      }
      setCargando(false);
    }

    relojRef.current = setInterval(() => {
      setSegundos((s) => (s > 0 ? s - 1 : 0));
    }, 1000);

    cargar();

    return () => clearInterval(relojRef.current);
  }, []);

  function handleCambiarCategoria(valor) {
    setCategoria(valor);
  }

  function handleBuscar(valor) {
    setTexto(valor);
  }

  const visibles = filtrarPorTexto(filtrarPorCategoria(fotos, categoria), texto);

  return (
    <div>
      <Encabezado total={visibles.length} cargando={cargando} segundos={segundos} />

      <main className="container mb-5">
        {error !== '' && <div className="alert alert-danger">Error: {error}</div>}

        {cargando ? (
          <p className="text-muted">regresamos en 3 segundos wait</p>
        ) : (
          <Galeria
            fotos={visibles}
            categoria={categoria}
            texto={texto}
            onCambiarCategoria={handleCambiarCategoria}
            onBuscar={handleBuscar}
          />
        )}
      </main>

      <footer className="bg-dark text-white text-center py-3">
        <p className="small mb-0">jluzz-biblio-awp &middot; IDGS1003</p>
      </footer>

      <PWABadge />
    </div>
  );
}

export default App;
