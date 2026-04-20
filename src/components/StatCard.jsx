function StatCard({ title, value, subtitle }) {
  return (
    <article className="card stat-card">
      <p className="muted">{title}</p>
      <h3>{value}</h3>
      <p>{subtitle}</p>
    </article>
  );
}

export default StatCard;
