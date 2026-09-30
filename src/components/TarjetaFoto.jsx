function TarjetaFoto({ foto }) {
  return (
    <div className="col-6 col-md-4 col-lg-3">
      <div className="card h-100">
        <img src={foto.imagen} className="card-img-top" alt={foto.titulo} />
        <div className="card-body">
          <h5 className="card-title h6">{foto.titulo}</h5>
          <p className="card-text small text-muted mb-0">
            me dio error poner autor asi que mejor lo quite
          </p>
        </div>
      </div>
    </div>
  );
}

export default TarjetaFoto;
