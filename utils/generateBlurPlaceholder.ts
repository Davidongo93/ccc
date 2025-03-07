import type { ImageProps } from './types';

// Usamos un cache para evitar la re-fetch de la misma imagen
const cache = new Map<ImageProps, string>();

export default async function getBase64ImageUrl(image: ImageProps): Promise<string> {
  let url = cache.get(image);
  if (url) {
    return url;
  }

  // Generamos la URL para Cloudinary con transformaciones
  const cloudinaryUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_8,q_70/${image.public_id}.${image.format}`;

  // Convertimos la URL en base64
  const response = await fetch(cloudinaryUrl);
  const buffer = await response.arrayBuffer();
  url = `data:image/jpeg;base64,${Buffer.from(buffer).toString('base64')}`;

  // Almacenamos la URL en caché
  cache.set(image, url);

  return url;
}
