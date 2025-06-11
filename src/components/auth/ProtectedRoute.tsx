import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { AuthModal } from './AuthModal';
import { useState } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user } = useAuth();
  const location = useLocation();
  const [showAuthModal, setShowAuthModal] = useState(!user);

  if (!user) {
    return (
      <>
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
        />
        <Navigate to="/" state={{ from: location }} replace />
      </>
    );
  }

  return <>{children}</>;
}; 