import { CATEGORY_OPTIONS, YEAR_OPTIONS } from '../utils/constants';

function ReleaseFilters({ filters, onChange }) {
  return (
    <section className="card filter-grid">
      <div>
        <label>Search</label>
        <input
          name="search"
          value={filters.search}
          onChange={onChange}
          placeholder="Search by title"
        />
      </div>

      <div>
        <label>Category</label>
        <select name="category" value={filters.category} onChange={onChange}>
          {CATEGORY_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Year</label>
        <select name="year" value={filters.year} onChange={onChange}>
          {YEAR_OPTIONS.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Platform</label>
        <input
          name="platform"
          value={filters.platform}
          onChange={onChange}
          placeholder="Netflix, PS5, Crunchyroll..."
        />
      </div>
    </section>
  );
}

export default ReleaseFilters;
