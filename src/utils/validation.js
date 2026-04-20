export function validateAuthForm({ name, email, password, mode = 'login' }) {
  if (mode === 'signup' && !name.trim()) return 'Name is required.';
  if (!email.trim()) return 'Email is required.';
  if (!/\S+@\S+\.\S+/.test(email)) return 'Enter a valid email address.';
  if (!password.trim()) return 'Password is required.';
  if (password.length < 6) return 'Password must be at least 6 characters.';
  return '';
}
