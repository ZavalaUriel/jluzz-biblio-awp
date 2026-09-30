import { useEffect, useRef, useState } from 'react';
import Encabezado from './components/Encabezado.jsx';
import Galeria from './components/Galeria.jsx';
import PWABadge from './PWABadge.jsx';
import { CANTIDAD, cargarFotos, contarFotos, filtrarPorCategoria } from './biblioteca.js';
import './App.css';

const CATEGORIAS = ['todas', 'Ingresos', 'Estantes', 'Salon de lectura', 'Hemeroteca', 'Servicios'];

function App() {
  const [fotos, setFotos] = useState([]);
  const [categoria, setCategoria] = useState('todas');
  const [cargando, setCargando] = useState(true);
  const [restante, setRestante] = useState(3);
  const [error, setError] = useState('');
  const intervaloRef = useRef(null);

  useEffect(() => {
    let cancelado = false;

    const cargar = async () => {
      try {
        const resultado = await cargarFotos(CANTIDAD);
        if (cancelado) return;
        setFotos(resultado);
      } catch (error) {
        if (!cancelado) setError(error.message);
      } finally {
        if (!cancelado) setCargando(false);
      }
    };

    intervaloRef.current = setInterval(() => {
      setRestante((actual) => (actual > 0 ? actual - 1 : 0));
    }, 1000);

    cargar();

    return () => {
      cancelado = true;
      clearInterval(intervaloRef.current);
    };
  }, []);

  const visibles = filtrarPorCategoria(fotos, categoria);

  return (
    <div>
      <Encabezado total={contarFotos(visibles)} cargando={cargando} restante={restante} />

      <main className="container mb-5">
        {error !== '' && <p className="alert alert-danger">Error: {error}</p>}

        {cargando ? (
          <p className="text-muted">La galeria aparecera en 3 segundos.</p>
        ) : (
          <Galeria
            fotos={visibles}
            categorias={CATEGORIAS}
            categoria={categoria}
            onCambiarCategoria={setCategoria}
          />
        )}
      </main>

      <footer className="bg-dark text-green text-center py-3">
        <p className="small mb-0">pagina fea pero funcional &middot; IDGS1003</p>
      </footer>

      <PWABadge />
    </div>
  );
}

export default App;
