import { Navigate, Outlet } from 'react-router';

import { useAuth } from '../features/auth/AuthContext';

export function ProtectedRoute() {
  const {
    isAuthenticated,
    isLoading,
  } = useAuth();

  if (isLoading) {
    return (
      <div className="page-container">
        <p>Carregando sessão...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  return <Outlet />;
}