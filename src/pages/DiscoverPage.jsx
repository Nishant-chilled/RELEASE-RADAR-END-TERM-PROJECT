import { useCallback, useEffect, useMemo, useState } from 'react';
import EmptyState from '../components/EmptyState';
import Loader from '../components/Loader';
import ReleaseCard from '../components/ReleaseCard';
import ReleaseFilters from '../components/ReleaseFilters';
import ReleaseModal from '../components/ReleaseModal';
import Toast from '../components/Toast';
import { useWatchlist } from '../hooks/useWatchlist';
import { fetchReleasesByCategory } from '../services/contentService';

function DiscoverPage() {
  const { items: savedItems, addItem } = useWatchlist();

  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    year: '2026',
    platform: '',
  });

  const [releases, setReleases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [showToast, setShowToast] = useState(false);

  const loadReleases = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const data = await fetchReleasesByCategory(
        filters.category,
        filters.year,
        filters.search
      );
      setReleases(data);
    } catch (err) {
      setError(err.message || 'Failed to load releases.');
      setReleases([]);
    } finally {
      setLoading(false);
    }
  }, [filters.category, filters.year, filters.search]);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadReleases();
    }, 350);

    return () => clearTimeout(timer);
  }, [loadReleases]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFilters((current) => ({ ...current, [name]: value }));
  };

  const handleSave = async (item) => {
  const added = await addItem({
    ...item,
    status: 'interested',
    notes: '',
  });

  if (added) {
    setShowToast(true);
  }
};

  const filteredReleases = useMemo(() => {
    return releases.filter((item) => {
      const matchesPlatform = filters.platform
        ? item.platform.toLowerCase().includes(filters.platform.toLowerCase())
        : true;
      return matchesPlatform;
    });
  }, [releases, filters.platform]);

  const savedIds = useMemo(
    () => new Set(savedItems.map((item) => item.externalId)),
    [savedItems]
  );

  return (
    <section className="page-stack">
      <div className="hero card">
        <h2>Discover releases from 2024–2026</h2>
        <p>
          Use category, year, platform, and title filters to build your personal
          watchlist.
        </p>
      </div>

      <ReleaseFilters filters={filters} onChange={handleChange} />

      {loading ? (
        <Loader label="Fetching releases..." />
      ) : error ? (
        <div className="message message--error">{error}</div>
      ) : filteredReleases.length === 0 ? (
        <EmptyState
          title="No releases found"
          description="Try a different year, category, or platform filter."
        />
      ) : (
        <section className="release-grid">
          {filteredReleases.map((item) => (
            <div
              key={item.externalId}
              onClick={() => setSelectedItem(item)}
              style={{ cursor: 'pointer' }}
            >
              <ReleaseCard
                item={item}
                onSave={handleSave}
                isSaved={savedIds.has(item.externalId)}
              />
            </div>
          ))}
        </section>
      )}

      <ReleaseModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onSave={handleSave}
        isSaved={selectedItem ? savedIds.has(selectedItem.externalId) : false}
      />

      <Toast
        message="Added to Watchlist ✅"
        show={showToast}
        onClose={() => setShowToast(false)}
      />
    </section>
  );
}

export default DiscoverPage;