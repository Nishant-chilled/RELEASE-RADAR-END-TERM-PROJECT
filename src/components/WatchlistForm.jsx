import { useEffect, useRef, useState } from 'react';
import { WATCH_STATUS_OPTIONS } from '../utils/constants';

function WatchlistForm({ item, onSubmit, onCancel }) {
  const noteRef = useRef(null);
  const [formData, setFormData] = useState({
    status: item?.status || 'interested',
    notes: item?.notes || '',
  });

  useEffect(() => {
    noteRef.current?.focus();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="watchlist-form" onSubmit={handleSubmit}>
      <label>
        Status
        <select name="status" value={formData.status} onChange={handleChange}>
          {WATCH_STATUS_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <label>
        Personal Note
        <textarea
          ref={noteRef}
          name="notes"
          rows="4"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Why did you save this?"
        />
      </label>

      <div className="form-actions">
        <button className="button" type="submit">
          Save Changes
        </button>
        <button className="button button--ghost" type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default WatchlistForm;
