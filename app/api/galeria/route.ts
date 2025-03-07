import cloudinary from 'cloudinary';
import { NextResponse } from 'next/server';

cloudinary.v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const folder = process.env.CLOUDINARY_FOLDER || searchParams.get('folder');

    const results = await cloudinary.v2.search
      .expression(`folder:${folder}/*`)
      .sort_by('public_id', 'desc')
      .max_results(400)
      .execute();

    return NextResponse.json(results.resources);
  } catch {
    return NextResponse.json({ error: 'Error al obtener imágenes.' }, { status: 500 });
  }
}
