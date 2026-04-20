import { useState } from 'react';
import { formatDate, getCountdownLabel } from '../utils/formatters';

function ReleaseModal({ item, onClose, onSave, isSaved }) {
  const [isSaving, setIsSaving] = useState(false);

  if (!item) return null;

  const handleSaveClick = async () => {
    if (isSaved || isSaving) return;

    try {
      setIsSaving(true);
      await onSave(item);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <img
          src={item.image || 'https://via.placeholder.com/1200x700?text=No+Image'}
          alt={item.title}
          className="modal-image"
        />

        <div className="modal-body">
          <h2>{item.title}</h2>

          <p><strong>Category:</strong> {item.category}</p>
          <p><strong>Year:</strong> {item.year}</p>
          <p><strong>Release:</strong> {formatDate(item.releaseDate)}</p>
          <p><strong>Platform:</strong> {item.platform}</p>

          <p className="modal-overview">{item.overview}</p>

          <div className="modal-footer">
            <span className="countdown">{getCountdownLabel(item.releaseDate)}</span>

            <button
              className={`button ${isSaving ? 'button--loading' : ''}`}
              disabled={isSaved || isSaving}
              onClick={handleSaveClick}
            >
              {isSaved ? 'Saved' : isSaving ? 'Saving...' : 'Add to Watchlist'}
            </button>

            <button className="button button--ghost" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReleaseModal;