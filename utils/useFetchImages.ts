/* eslint-disable @typescript-eslint/no-explicit-any */
// utils/useFetchImages.ts
import { useEffect, useState } from 'react';
import getBase64ImageUrl from './generateBlurPlaceholder';
import type { ImageProps } from './types';

const useFetchImages = (folder: string) => {
  const [images, setImages] = useState<ImageProps[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch(`/api/galeria`);
        const results = await res.json();

        const reducedResults: ImageProps[] = results.map((result: any, index: number) => ({
          id: index,
          height: result.height,
          width: result.width,
          public_id: result.public_id,
          format: result.format
        }));

        const blurImagePromises = results.map((image: ImageProps) => getBase64ImageUrl(image));
        const imagesWithBlurDataUrls = await Promise.all(blurImagePromises);

        if (reducedResults.length !== imagesWithBlurDataUrls.length) {
          console.error('Las longitudes de reducedResults e imagesWithBlurDataUrls no coinciden.');
          throw new Error('Error en los datos procesados.');
        }

        for (let i = 0; i < reducedResults.length; i++) {
          if (imagesWithBlurDataUrls[i]) {
            (reducedResults[i] as ImageProps).blurDataUrl = imagesWithBlurDataUrls[i];
          }
        }

        setImages(reducedResults);
      } catch (err: any) {
        setError(err.message || 'Error al obtener imágenes.');
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [folder]);

  return { images, loading, error };
};

export default useFetchImages;
