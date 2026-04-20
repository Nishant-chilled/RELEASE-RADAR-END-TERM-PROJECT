import { useState } from 'react';
import { formatDate } from '../utils/formatters';
import WatchlistForm from './WatchlistForm';

function WatchlistItemCard({ item, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);

  const handleSubmit = async (updates) => {
    await onUpdate(item.id, updates);
    setEditing(false);
  };

  return (
    <article className="card watchlist-card">
      <div className="watchlist-card__header">
        <div>
          <span className="badge">{item.category}</span>
          <h3>{item.title}</h3>
          <p className="muted">Release: {formatDate(item.releaseDate)}</p>
          <p className="muted">Platform: {item.platform}</p>
        </div>
        <div className="watchlist-card__actions">
          <button className="button button--ghost" onClick={() => setEditing((current) => !current)}>
            {editing ? 'Close' : 'Edit'}
          </button>
          <button className="button button--danger" onClick={() => onDelete(item.id)}>
            Delete
          </button>
        </div>
      </div>

      {!editing ? (
        <>
          <p><strong>Status:</strong> {item.status}</p>
          <p><strong>Notes:</strong> {item.notes || 'No notes added yet.'}</p>
        </>
      ) : (
        <WatchlistForm item={item} onSubmit={handleSubmit} onCancel={() => setEditing(false)} />
      )}
    </article>
  );
}

export default WatchlistItemCard;
