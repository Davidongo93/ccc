'use client';

import { NextPage } from 'next';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import useFetchImages from '../../utils/useFetchImages';

const Galeria: NextPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { images, loading, error } = useFetchImages(process.env.CLOUDINARY_FOLDER || '');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  console.log('Images inside component:', images);

  return (
    <main className="mx-auto mt-20 max-w-[1960px] bg-slate-100 p-4">
      <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
        {images.map(({ id, public_id, format, blurDataUrl }) => (
          <div
            key={id}
            // href={`/galeria/${id}`}
            className="after:content after:shadow-highlight group relative mb-5 block w-full after:pointer-events-none after:absolute after:inset-0 after:rounded-lg"
          >
            <Image
              alt="Next.js Conf photo"
              className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
              style={{ transform: 'translate3d(0, 0, 0)' }}
              placeholder="blur"
              blurDataURL={blurDataUrl}
              src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_720/${public_id}.${format}`}
              width={720}
              height={480}
              sizes="(max-width: 640px) 100vw,
                (max-width: 1280px) 50vw,
                (max-width: 1536px) 33vw,
                25vw"
            />
          </div>
        ))}
      </div>
    </main>
  );
};

export default Galeria;
