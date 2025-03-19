'use client';

import { useState, useEffect } from 'react';
import { API_ROUTES } from '../../config/api.config';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

interface UserInfo {
  name: string;
  email: string;
  phone: string;
  province: string;
  city: string;
  address: string;
  zipCode: string;
}

export default function ProfileInfo() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      const response = await fetch(API_ROUTES.ME, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('token');
          router.push('/login');
          return;
        }
        throw new Error('Error al obtener información del usuario');
      }

      const data = await response.json();
      setUserInfo(data);
    } catch (error) {
      toast.error('Error al cargar la información del usuario');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.dispatchEvent(new Event('authStateChanged'));
    toast.success('Sesión cerrada exitosamente');
    router.push('/');
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!userInfo) {
    return null;
  }

  return (
    <div className="bg-white shadow rounded-lg p-6 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Mi Perfil</h2>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
        >
          Cerrar Sesión
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Nombre</h3>
            <p className="mt-1 text-lg text-gray-900">{userInfo.name}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Correo Electrónico</h3>
            <p className="mt-1 text-lg text-gray-900">{userInfo.email}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Teléfono</h3>
            <p className="mt-1 text-lg text-gray-900">{userInfo.phone}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Departamento</h3>
            <p className="mt-1 text-lg text-gray-900">{userInfo.province}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Ciudad</h3>
            <p className="mt-1 text-lg text-gray-900">{userInfo.city}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Dirección</h3>
            <p className="mt-1 text-lg text-gray-900">{userInfo.address}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Código Postal</h3>
            <p className="mt-1 text-lg text-gray-900">{userInfo.zipCode}</p>
          </div>
        </div>
      </div>
    </div>
  );
} 