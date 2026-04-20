import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <section className="hero card">
      <h2>404 — Page not found</h2>
      <p>The page you are looking for does not exist.</p>
      <Link className="button" to="/dashboard">
        Go back home
      </Link>
    </section>
  );
}

export default NotFoundPage;
