import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../lib/api'
import BookGrid from '../components/BookGrid'
import GenreFilter from '../components/GenreFilter'
import SearchBar from '../components/SearchBar'
import SortControl from '../components/SortControl'

function HomePage() {
  const [search, setSearch] = useState('')
  const [genreId, setGenreId] = useState('')
  const [sortBy, setSortBy] = useState('title')
  const [genres, setGenres] = useState([])
  const [genresLoading, setGenresLoading] = useState(true)
  const [genresError, setGenresError] = useState(false)
  const handleSearch = useCallback((value) => setSearch(value), [])

  useEffect(() => {
    const controller = new AbortController()
    api.get('/genres', { signal: controller.signal })
      .then((response) => setGenres(Array.isArray(response.data) ? response.data : []))
      .catch((error) => {
        if (error.name !== 'CanceledError') setGenresError(true)
      })
      .finally(() => {
        if (!controller.signal.aborted) setGenresLoading(false)
      })
    return () => controller.abort()
  }, [])

  return (
    <div className="site-shell">
      <header className="site-header">
        <Link className="brand" to="/" aria-label="Open Shelf home">
          <span className="brand-mark" aria-hidden="true"><span /></span>
          <span>open<span className="brand-light">shelf</span></span>
        </Link>
        <a className="header-note" href="#catalog">The community library <span aria-hidden="true">↘</span></a>
      </header>

      <main>
        <section className="intro" aria-labelledby="page-title">
          <p className="eyebrow"><span className="eyebrow-line" />A LITTLE MORE WELL READ</p>
          <h1 id="page-title">Find your next<br /><span>favorite.</span></h1>
          <p className="intro-copy">Good stories have a way of finding us. Browse the shelves and see what speaks to you.</p>
          <div className="intro-decoration" aria-hidden="true">
            <span className="deco-circle deco-circle-one" /><span className="deco-circle deco-circle-two" />
            <span className="deco-caption">Take your time.<br />Stay a little.</span>
          </div>
        </section>

        <section className="catalog-section" id="catalog" aria-labelledby="catalog-heading">
          <div className="catalog-heading-row">
            <div>
              <p className="eyebrow eyebrow-muted">THE COLLECTION</p>
              <h2 id="catalog-heading">Browse the shelves<span className="heading-period">.</span></h2>
            </div>
            <span className="collection-note">A good book is always<br />worth the search.</span>
          </div>

          <div className="catalog-toolbar">
            <SearchBar onSearch={handleSearch} />
            <GenreFilter
              genres={genres}
              selectedGenre={genreId}
              onGenreChange={setGenreId}
              loading={genresLoading}
              error={genresError}
            />
            <SortControl sortBy={sortBy} onSortChange={setSortBy} />
          </div>

          <BookGrid genreId={genreId} search={search} sortBy={sortBy} />
        </section>
      </main>

      <footer className="site-footer">
        <Link className="brand footer-brand" to="/">
          <span className="brand-mark" aria-hidden="true"><span /></span>
          <span>open<span className="brand-light">shelf</span></span>
        </Link>
        <span>Made for curious minds.</span>
        <a href="#catalog">Back to the shelves ↑</a>
      </footer>
    </div>
  )
}

export default HomePage
