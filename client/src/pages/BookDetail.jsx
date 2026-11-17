import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import api from '../lib/api'

function BookDetail() {
  const { id } = useParams()
  const [result, setResult] = useState(null)

  useEffect(() => {
    const controller = new AbortController()
    api.get(`/books/${id}`, { signal: controller.signal })
      .then((response) => setResult({ id, book: response.data, error: '' }))
      .catch((requestError) => {
        if (requestError.name !== 'CanceledError') {
          setResult({
            id,
            book: null,
            error: requestError.response?.status === 404
              ? 'This book isn’t on our shelves. It may have been removed.'
              : 'We couldn’t load this book. Check your connection and try again.',
          })
        }
      })
    return () => controller.abort()
  }, [id])

  return (
    <div className="site-shell detail-shell">
      <header className="site-header">
        <Link className="brand" to="/" aria-label="Open Shelf home">
          <span className="brand-mark" aria-hidden="true"><span /></span>
          <span>open<span className="brand-light">shelf</span></span>
        </Link>
        <Link className="back-link" to="/">← <span>Back to the catalog</span></Link>
      </header>

      <main className="detail-main">
        {result?.id !== id ? (
          <div className="status-panel" role="status"><span className="spinner" />Finding this book…</div>
        ) : result.error ? (
          <div className="status-panel status-error" role="alert"><span className="status-symbol">!</span><h1>Book unavailable</h1><p>{result.error}</p><Link className="button button-dark" to="/">Return to catalog</Link></div>
        ) : result.book && (
          <article className="detail-layout">
            <div className="detail-cover" aria-label={`Decorative cover for ${result.book.title}`}>
              <span className="detail-cover-overline">OPEN SHELF · COLLECTION</span>
              <span className="detail-cover-initial">{result.book.title?.trim().charAt(0).toUpperCase() || 'B'}</span>
              <span className="detail-cover-rule" />
              <span className="detail-cover-title">{result.book.title}</span>
              <span className="detail-cover-author">{result.book.author}</span>
              <span className="detail-cover-bottom">A STORY TO KEEP</span>
            </div>
            <div className="detail-copy">
              <p className="eyebrow eyebrow-muted">BOOK DETAILS</p>
              <span className="genre-tag detail-genre">{result.book.genre?.name || 'Uncategorized'}</span>
              <h1>{result.book.title}</h1>
              <p className="detail-author">by <span>{result.book.author}</span></p>
              <div className="detail-divider" />
              <p className="detail-description">This catalog record includes the book’s genre, ISBN, and current copy availability.</p>
              <dl className="book-facts">
                <div><dt>Availability</dt><dd className={Number(result.book.availableCopies) > 0 ? 'fact-available' : 'fact-unavailable'}>{Number(result.book.availableCopies) > 0 ? 'Available to borrow' : 'Currently checked out'}</dd></div>
                <div><dt>Copies on shelf</dt><dd>{result.book.availableCopies} of {result.book.totalCopies}</dd></div>
                <div><dt>ISBN</dt><dd>{result.book.isbn}</dd></div>
              </dl>
              <Link className="button button-dark" to="/">Explore more books <span aria-hidden="true">→</span></Link>
            </div>
          </article>
        )}
      </main>

      <footer className="site-footer">
        <Link className="brand footer-brand" to="/"><span className="brand-mark" aria-hidden="true"><span /></span><span>open<span className="brand-light">shelf</span></span></Link>
        <span>Made for curious minds.</span>
        <Link to="/">Back to the shelves ↑</Link>
      </footer>
    </div>
  )
}

export default BookDetail
