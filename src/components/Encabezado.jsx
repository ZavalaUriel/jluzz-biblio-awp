function Encabezado({ total, cargando, restante }) {
  return (
    <header className="bg-dark text-white py-4 mb-4">
      <div className="container">
        <h1 className="h3 mb-1">Galeria de la Biblioteca UTL</h1>
        <p className="mb-0">
          {cargando ? 'Cargando en ' + restante + ' segundos...' : total + ' fotografias en la galeria'}
        </p>
      </div>
    </header>
  );
}

export default Encabezado;
