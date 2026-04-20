import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { useAuth } from '../hooks/useAuth';

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async ({ email, password }) => {
    try {
      setSubmitting(true);
      setError('');
      await login({ email, password });
      navigate(location.state?.from?.pathname || '/dashboard');
    } catch (err) {
      setError(err.message || 'Failed to log in.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="auth-page">
      <AuthForm mode="login" onSubmit={handleLogin} submitting={submitting} serverError={error} />
      <p className="auth-page__switch">
        New here? <Link to="/signup">Create an account</Link>
      </p>
    </section>
  );
}

export default LoginPage;
