import { useState, type FormEvent } from "react";

import { Navigate } from "react-router";

import { useAuth } from "../features/auth/AuthContext";

export function LoginPage() {
  const { login, isAuthenticated } = useAuth();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [error, setError] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/pacientes" replace />;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError(null);
    setIsSubmitting(true);

    try {
      await login({
        email,
        senha,
      });
    } catch {
      setError("Não foi possível realizar o login. Verifique as credenciais.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <span className="eyebrow" data-testid="login-title">
          Clínica Médica
        </span>

        <h1 data-testid="login-subtitle">Entrar no sistema</h1>

        <label>
          E-mail
          <input
            type="email"
            value={email}
            data-testid="login-email"
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </label>

        <label>
          Senha
          <input
            type="password"
            value={senha}
            data-testid="login-password"
            onChange={(event) => setSenha(event.target.value)}
            required
          />
        </label>

        {error && (
          <div className="form-error" data-testid="login-form-error">
            {error}
          </div>
        )}

        <button
          type="submit"
          data-testid="login-submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}
