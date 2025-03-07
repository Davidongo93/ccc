import cloudinary from 'cloudinary';

cloudinary.v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  secure: true
});

const getImageUrl = (publicId: string, width: number, height: number, format: string) => {
  return cloudinary.v2.url(publicId, {
    width,
    height,
    crop: 'scale',
    format
  });
};

export default getImageUrl;

export const v2 = cloudinary.v2;
