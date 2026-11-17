import { useEffect, useState } from 'react'

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => onSearch(query.trim()), 400)
    return () => clearTimeout(timer)
  }, [query, onSearch])

  return (
    <label className="search-field">
      <span className="sr-only">Search books by title or author</span>
      <svg aria-hidden="true" viewBox="0 0 24 24" className="search-icon">
        <circle cx="10.8" cy="10.8" r="6.8" />
        <path d="m16 16 4.3 4.3" />
      </svg>
      <input
        type="search"
        placeholder="Search title or author"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      {query && <button className="clear-search" type="button" onClick={() => setQuery('')} aria-label="Clear search">×</button>}
    </label>
  )
}

export default SearchBar
