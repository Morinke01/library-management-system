import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import BookDetail from './pages/BookDetail'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/books/:id" element={<BookDetail />} />
      <Route path="*" element={<main className="not-found"><h1>Page not found</h1><a href="/">Back to the catalog</a></main>} />
    </Routes>
  )
}

export default App
