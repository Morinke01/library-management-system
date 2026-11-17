import { useEffect, useState } from 'react'
import api from '../lib/api'
import BookCard from './BookCard'
import BookSkeleton from './BookSkeleton'

function BookGrid({ genreId, search, sortBy }) {
  const [result, setResult] = useState(null)
  const requestKey = JSON.stringify([genreId, search])

  useEffect(() => {
    const controller = new AbortController()
    const params = {}
    if (genreId) params.genreId = genreId
    if (search) params.search = search

    api.get('/books', { params, signal: controller.signal })
      .then((response) => {
        const result = response.data
        setResult({
          key: requestKey,
          books: Array.isArray(result) ? result : (result.data || []),
          error: '',
        })
      })
      .catch((requestError) => {
        if (requestError.name !== 'CanceledError') {
          setResult({
            key: requestKey,
            books: [],
            error: 'We couldn’t load the catalog. Check that the library API is running, then try again.',
          })
        }
      })

    return () => controller.abort()
  }, [genreId, search, requestKey])

  if (result?.key !== requestKey) {
    return (
      <section className="book-grid" aria-label="Loading books" aria-busy="true">
        <span className="sr-only" role="status">Loading the catalog…</span>
        {Array.from({ length: 6 }, (_, index) => <BookSkeleton key={index} />)}
      </section>
    )
  }

  if (result.error) {
    return (
      <div className="status-panel status-error" role="alert">
        <span className="status-symbol">!</span>
        <h2>Catalog unavailable</h2>
        <p>{result.error}</p>
        <button className="button button-dark" type="button" onClick={() => window.location.reload()}>Try again</button>
      </div>
    )
  }

  if (result.books.length === 0) {
    return (
      <div className="status-panel status-empty">
        <span className="status-symbol">⌕</span>
        <h2>No books found</h2>
        <p>Try a different title, author, or genre.</p>
      </div>
    )
  }

  const sortedBooks = [...result.books].sort((first, second) =>
    (first[sortBy] || '').localeCompare(second[sortBy] || '', undefined, { sensitivity: 'base' }),
  )

  return (
    <section className="book-grid" aria-label="Books">
      {sortedBooks.map((book) => <BookCard key={book.id} book={book} />)}
    </section>
  )
}

export default BookGrid
