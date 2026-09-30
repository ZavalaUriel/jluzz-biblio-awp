import base from './biblioteca.json';

export const URL_FOTOS = 'https://picsum.photos/v2/list?page=1';
export const CANTIDAD = 4;
export const TIEMPO_CARGA = 3000;

export const CATEGORIAS = [
  'todas',
  'libros ',
  'descanso',
  'salones',
  'centro de computo',
  'recepcion'
];

export function esperar(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function crearFoto(titulo, categoria, imagen) {
  return { titulo, categoria, imagen };
}

export function filtrarPorCategoria(fotos, categoria) {
  if (categoria === 'todas') return fotos;
  return fotos.filter((f) => f.categoria === categoria);
}

export function filtrarPorTexto(fotos, texto) {
  if (texto === '') return fotos;
  return fotos.filter((f) => f.titulo.toLowerCase().includes(texto.toLowerCase()));
}

export async function cargarFotos(cantidad) {
  await esperar(TIEMPO_CARGA);

  const res = await fetch(`${URL_FOTOS}&limit=${cantidad}`);
  if (!res.ok) throw new Error('No se pudo conectar con el API');

  const lista = await res.json();

  return lista.map((item, i) => {
    const info = base[i % base.length];
    return crearFoto(
      info.titulo,
      info.categoria,
      `https://picsum.photos/id/${item.id}/400/300`
    );
  });
}
