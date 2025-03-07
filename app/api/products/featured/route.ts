import { getCollectionProducts } from 'lib/shopify';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const products = await getCollectionProducts({ collection: 'homepage-carousel' });
    return NextResponse.json({ products });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ products: [] }, { status: 500 });
  }
} 