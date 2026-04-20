import { useState } from 'react';
import { validateAuthForm } from '../utils/validation';

function AuthForm({ mode, onSubmit, submitting, serverError }) {
  const isSignup = mode === 'signup';
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [clientError, setClientError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationError = validateAuthForm({ ...formData, mode });

    if (validationError) {
      setClientError(validationError);
      return;
    }

    setClientError('');
    await onSubmit(formData);
  };

  return (
    <form className="auth-form card" onSubmit={handleSubmit}>
      <h2>{isSignup ? 'Create your account' : 'Welcome back'}</h2>
      <p>{isSignup ? 'Start building your personalized release dashboard.' : 'Log in to track upcoming drops.'}</p>

      {isSignup && (
        <label>
          Full Name
          <input name="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" />
        </label>
      )}

      <label>
        Email
        <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" />
      </label>

      <label>
        Password
        <input
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Minimum 6 characters"
        />
      </label>

      {(clientError || serverError) && <div className="message message--error">{clientError || serverError}</div>}

      <button className="button" disabled={submitting} type="submit">
        {submitting ? 'Please wait...' : isSignup ? 'Sign Up' : 'Log In'}
      </button>
    </form>
  );
}

export default AuthForm;
