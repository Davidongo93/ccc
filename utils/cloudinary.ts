import { Cloudinary } from 'cloudinary-core';

const cloudinary = new Cloudinary({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  secure: true
});

const getImageUrl = (publicId: string, width: number, height: number, format: string) => {
  return cloudinary.url(publicId, {
    width,
    height,
    crop: 'scale',
    format
  });
};

export default getImageUrl;
