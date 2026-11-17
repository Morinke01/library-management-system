function BookSkeleton() {
  return (
    <article className="book-card book-skeleton" aria-hidden="true">
      <div className="skeleton-art"><span className="skeleton-shimmer" /></div>
      <div className="skeleton-content">
        <span className="skeleton-line skeleton-meta" />
        <span className="skeleton-line skeleton-title" />
        <span className="skeleton-line skeleton-author" />
        <span className="skeleton-divider" />
        <span className="skeleton-line skeleton-footer" />
      </div>
    </article>
  )
}

export default BookSkeleton
