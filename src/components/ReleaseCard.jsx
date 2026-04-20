import { useState } from 'react';
import { formatDate, getCountdownLabel } from '../utils/formatters';

function ReleaseCard({ item, onSave, isSaved }) {
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveClick = async (e) => {
    e.stopPropagation();

    if (isSaved || isSaving) return;

    try {
      setIsSaving(true);
      await onSave(item);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <article className="release-card card">
      <div className="release-card__image-wrap">
        <img
          src={item.image || 'https://via.placeholder.com/500x750?text=No+Image'}
          alt={item.title}
          className={`release-card__image ${
            item.category === 'sports'
              ? 'release-card__image--contain'
              : 'release-card__image--cover'
          }`}
          onError={(e) => {
            e.currentTarget.src = 'https://via.placeholder.com/500x750?text=No+Image';
          }}
        />
      </div>

      <div className="release-card__body">
        <div className="release-card__top">
          <span className="badge">{item.category}</span>
          <span className="muted">{item.year}</span>
        </div>

        <h3 className="release-card__title">{item.title}</h3>

        <p className="muted">Release: {formatDate(item.releaseDate)}</p>
        <p className="muted">
          <strong>Platform:</strong> {item.platform}
        </p>

        <p className="release-card__overview">{item.overview}</p>

        <div className="release-card__footer">
          <span className="countdown">{getCountdownLabel(item.releaseDate)}</span>

          <button
            className={`button ${isSaving ? 'button--loading' : ''}`}
            disabled={isSaved || isSaving}
            onClick={handleSaveClick}
          >
            {isSaved ? 'Saved' : isSaving ? 'Saving...' : 'Add to Watchlist'}
          </button>
        </div>
      </div>
    </article>
  );
}

export default ReleaseCard;