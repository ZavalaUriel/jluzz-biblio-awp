import TarjetaFoto from './TarjetaFoto.jsx';

function Galeria({ fotos, categorias, categoria, onCambiarCategoria }) {
  return (
    <section>
      <div className="btn-group mb-4">
        {categorias.map((item) => (
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

      {fotos.length === 0 ? (
        <p className="text-muted">No hay fotografias en esta categoria.</p>
      ) : (
        <div className="row g-3">
          {fotos.map((foto) => (
            <TarjetaFoto key={foto.id} foto={foto} />
          ))}
        </div>
      )}
    </section>
  );
}

export default Galeria;
