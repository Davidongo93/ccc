import { NextResponse } from 'next/server';
import { type NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const authorization = request.headers.get('authorization');
    
    if (!authorization) {
      return NextResponse.json(
        { message: 'No autorizado' },
        { status: 401 }
      );
    }

    // Hacer la petición al backend
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    const response = await fetch(`${backendUrl}/auth/me`, {
      headers: {
        'Authorization': authorization
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        errorData,
        { status: response.status }
      );
    }

    const userData = await response.json();
    return NextResponse.json(userData);

  } catch (error) {
    console.error('Error en /api/auth/me:', error);
    return NextResponse.json(
      { 
        message: 'Error interno del servidor',
        error: error instanceof Error ? error.message : 'Error desconocido'
      },
      { status: 500 }
    );
  }
} 