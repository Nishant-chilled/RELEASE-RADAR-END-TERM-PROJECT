import { useMemo } from 'react';
import EmptyState from '../components/EmptyState';
import Loader from '../components/Loader';
import StatCard from '../components/StatCard';
import { useWatchlist } from '../hooks/useWatchlist';
import { formatDate } from '../utils/formatters';

function DashboardPage() {
  const { items, loading } = useWatchlist();

  const stats = useMemo(() => {
    const upcoming = items.filter((item) => new Date(item.releaseDate) >= new Date()).length;
    const completed = items.filter((item) => item.status === 'completed').length;
    const animeCount = items.filter((item) => item.category === 'anime').length;
    const gameCount = items.filter((item) => item.category === 'game').length;

    return { upcoming, completed, animeCount, gameCount };
  }, [items]);

  const latestItems = useMemo(() => items.slice(0, 5), [items]);

  if (loading) {
    return <Loader label="Loading dashboard..." />;
  }

  return (
    <section className="page-stack">
      <div className="hero card">
        <h2>Your personalized release command center</h2>
        <p>
          Track upcoming drops across movies, anime, games, shows, and major sports events.
        </p>
      </div>

      <section className="stats-grid">
        <StatCard title="Saved items" value={items.length} subtitle="Everything currently in your watchlist." />
        <StatCard title="Upcoming releases" value={stats.upcoming} subtitle="Releases that are still ahead." />
        <StatCard title="Completed" value={stats.completed} subtitle="Items you have already watched or followed." />
        <StatCard title="Anime + Games" value={stats.animeCount + stats.gameCount} subtitle="Strong engagement categories." />
      </section>

      <section className="card">
        <h3>Recently saved</h3>
        {latestItems.length === 0 ? (
          <EmptyState
            title="Your watchlist is empty"
            description="Go to Discover and add titles you want to track."
          />
        ) : (
          <div className="list-stack">
            {latestItems.map((item) => (
              <article key={item.id} className="list-row">
                <div>
                  <strong>{item.title}</strong>
                  <p className="muted">{item.category} • {item.platform}</p>
                </div>
                <span>{formatDate(item.releaseDate)}</span>
              </article>
            ))}
          </div>
        )}
      </section>
    </section>
  );
}

export default DashboardPage;
