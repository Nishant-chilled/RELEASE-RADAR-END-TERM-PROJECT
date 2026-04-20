export function formatDate(dateString) {
  if (!dateString || dateString === 'TBA') return 'TBA';

  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;

  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

export function getCountdownLabel(dateString) {
  if (!dateString || dateString === 'TBA') return 'Date to be announced';

  const now = new Date();
  const target = new Date(dateString);
  const difference = Math.ceil((target - now) / (1000 * 60 * 60 * 24));

  if (Number.isNaN(difference)) return 'Unknown date';
  if (difference > 0) return `${difference} day(s) left`;
  if (difference === 0) return 'Releasing today';
  return 'Already released';
}
