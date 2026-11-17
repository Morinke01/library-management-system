function SortControl({ sortBy, onSortChange }) {
  return (
    <label className="sort-filter">
      <span>Sort books</span>
      <select aria-label="Sort books by title or author" value={sortBy} onChange={(event) => onSortChange(event.target.value)}>
        <option value="title">Title (A–Z)</option>
        <option value="author">Author (A–Z)</option>
      </select>
    </label>
  )
}

export default SortControl
