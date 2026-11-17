import { Link } from 'react-router-dom'

function BookCard({ book }) {
  const available = Number(book.availableCopies) > 0

  return (
    <article className="book-card">
      <div className="book-card-art" aria-hidden="true">
        <span className="book-art-mark">{book.title?.trim().charAt(0).toUpperCase() || 'B'}</span>
        <span className="book-art-rule" />
        <span className="book-art-genre">{book.genre?.name || 'Library edition'}</span>
      </div>
      <div className="book-card-content">
        <div className="book-card-meta">
          <span className="genre-tag">{book.genre?.name || 'Uncategorized'}</span>
          <span className={`availability ${available ? 'is-available' : 'is-unavailable'}`}>
            <span className="availability-dot" />{available ? 'Available' : 'Checked out'}
          </span>
        </div>
        <h2><Link to={`/books/${book.id}`}>{book.title}</Link></h2>
        <p className="book-author">by {book.author}</p>
        <div className="book-card-footer">
          <span>{book.availableCopies} of {book.totalCopies} copies</span>
          <Link className="card-link" to={`/books/${book.id}`} aria-label={`View details for ${book.title}`}>
            View details <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </article>
  )
}

export default BookCard
