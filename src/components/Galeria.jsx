import TarjetaFoto from './TarjetaFoto.jsx';
import { CATEGORIAS } from '../biblioteca.js';

function Galeria({ fotos, categoria, texto, onCambiarCategoria, onBuscar }) {
  return (
    <section>
      <div className="row g-2 mb-4">
        <div className="col-md-8">
          <div className="btn-group flex-wrap">
            {CATEGORIAS.map((item) => (
              <button
                key={item}
                type="button"
                className={item === categoria ? 'btn btn-dark' : 'btn btn-outline-dark'}
                onClick={() => onCambiarCategoria(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        <div className="col-md-4">
          <input
            className="form-control"
            type="text"
            placeholder="Buscar por nombre..."
            value={texto}
            onChange={(e) => onBuscar(e.target.value)}
          />
        </div>
      </div>

      {fotos.length === 0 ? (
        <p className="text-muted">No hay fotos que coincidan.</p>
      ) : (
        <div className="row g-3">
          {fotos.map((foto) => (
            <TarjetaFoto key={foto.titulo} foto={foto} />
          ))}
        </div>
      )}
    </section>
  );
}

export default Galeria;
