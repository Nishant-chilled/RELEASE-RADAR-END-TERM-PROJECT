import { useAuth } from '../hooks/useAuth';

function ProfilePage() {
  const { user, profile } = useAuth();

  return (
    <section className="page-stack">
      <div className="hero card">
        <h2>Profile</h2>
        <p>Basic account information for the authenticated user.</p>
      </div>

      <section className="card profile-grid">
        <div>
          <p className="muted">Display Name</p>
          <h3>{profile?.name || user?.displayName || 'Not set'}</h3>
        </div>
        <div>
          <p className="muted">Email</p>
          <h3>{user?.email}</h3>
        </div>
        <div>
          <p className="muted">UID</p>
          <h3>{user?.uid}</h3>
        </div>
      </section>
    </section>
  );
}

export default ProfilePage;
