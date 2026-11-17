function GenreFilter({ genres, selectedGenre, onGenreChange, loading, error }) {
  return (
    <label className="genre-filter">
      <span>Browse by genre</span>
      <select
        aria-label="Filter books by genre"
        value={selectedGenre}
        onChange={(event) => onGenreChange(event.target.value)}
        disabled={loading || Boolean(error)}
      >
        <option value="">All genres</option>
        {genres.map((genre) => <option key={genre.id} value={genre.id}>{genre.name}</option>)}
      </select>
      {error && <span className="filter-note">Genres unavailable</span>}
    </label>
  )
}

export default GenreFilter
