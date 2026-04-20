import EmptyState from '../components/EmptyState';
import Loader from '../components/Loader';
import WatchlistItemCard from '../components/WatchlistItemCard';
import { useWatchlist } from '../hooks/useWatchlist';

function WatchlistPage() {
  const { items, loading, error, updateItem, removeItem } = useWatchlist();

  if (loading) {
    return <Loader label="Loading your watchlist..." />;
  }

  return (
    <section className="page-stack">
      <div className="hero card">
        <h2>Your watchlist</h2>
        <p>Edit notes, update tracking status, or remove anything you no longer follow.</p>
      </div>

      {error && <div className="message message--error">{error}</div>}

      {items.length === 0 ? (
        <EmptyState
          title="Nothing saved yet"
          description="Head to Discover and add releases you want to monitor."
        />
      ) : (
        <div className="list-stack">
          {items.map((item) => (
            <WatchlistItemCard
              key={item.id}
              item={item}
              onUpdate={updateItem}
              onDelete={removeItem}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default WatchlistPage;
