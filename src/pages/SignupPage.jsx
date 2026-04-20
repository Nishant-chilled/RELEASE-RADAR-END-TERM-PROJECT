import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { useAuth } from '../hooks/useAuth';

function SignupPage() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSignup = async ({ name, email, password }) => {
    try {
      setSubmitting(true);
      setError('');
      await signup({ name, email, password });
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Failed to sign up.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="auth-page">
      <AuthForm mode="signup" onSubmit={handleSignup} submitting={submitting} serverError={error} />
      <p className="auth-page__switch">
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </section>
  );
}

export default SignupPage;
