import datosBase from './biblioteca.json';

export const API_FOTOS = 'https://picsum.photos/v2/list?page=1';
export const TIEMPO_ESPERA = 3000;
export const CANTIDAD = 1;

export const esperar = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const crearFoto = (titulo, categoria, autor, imagen) => ({
  id: Date.now() + Math.random(),
  titulo,
  categoria,
  autor,
  imagen
});

export const filtrarPorCategoria = (fotos, categoria) => {
  if (categoria === 'todas') return fotos;
  return fotos.filter((foto) => foto.categoria === categoria);
};

export const contarFotos = (fotos) => fotos.length;

export const cargarFotos = async (cantidad) => {
  await esperar(TIEMPO_ESPERA);

  const respuesta = await fetch(`${API_FOTOS}&limit=${cantidad}`);
  if (!respuesta.ok) throw new Error('El API no respondio correctamente');

  const lista = await respuesta.json();

  return lista.map((item, i) => {
    const base = datosBase[i % datosBase.length];
    const imagen = `https://picsum.photos/id/${item.id}/400/300`;
    return crearFoto(base.titulo, base.categoria, item.author, imagen);
  });
};
