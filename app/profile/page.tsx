import ProfileInfo from 'components/profile/profile-info';

export const metadata = {
  title: 'Mi Perfil',
  description: 'Gestiona tu información personal y preferencias',
};

export default function ProfilePage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 mt-20">
      <ProfileInfo />
    </div>
  );
} 