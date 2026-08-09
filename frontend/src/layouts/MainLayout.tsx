import {
  Link,
  Outlet,
  useNavigate,
} from 'react-router';

import {
  useAuth,
} from '../features/auth/AuthContext';

export function MainLayout() {
  const {
    user,
    logout,
  } = useAuth();

  const navigate =
    useNavigate();

  async function handleLogout() {
    await logout();

    navigate('/login');
  }

  return (
    <div className="application">
      <header className="application-header">
        <div className="header-content">
          <Link
            className="brand"
            to="/"
          >
            Clínica Médica
          </Link>

          <nav
            className="main-navigation"
            aria-label="Navegação principal"
          >
            <Link to="/">
              Início
            </Link>

            <Link to="/pacientes">
              Pacientes
            </Link>
          </nav>

          <div className="user-menu">
            <div>
              <strong>
                {user?.nome}
              </strong>

              <small>
                {user?.perfil}
              </small>
            </div>

            <button
              type="button"
              onClick={() =>
                void handleLogout()
              }
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      <main className="application-content">
        <Outlet />
      </main>

      <footer className="application-footer">
        Sistema de Gestão para Clínica Médica
      </footer>
    </div>
  );
}