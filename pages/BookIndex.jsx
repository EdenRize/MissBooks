const { Link } = ReactRouterDOM


import { BookList } from '../cmps/BookList.jsx'
import { BooksFilter } from '../cmps/BooksFilter.jsx'
import {booksService} from '../services/books-service.js'

const { useState, useEffect } = React

export function BookIndex() {
  const [books, setBooks] = useState(null)
  const [filterBy, setFilterBy] = useState(booksService.getFilterBy())

  useEffect(()=>{
    loadBooks()
  }, [filterBy])

  function loadBooks(){
    booksService.query()
      .then(books => setBooks(books))
      .catch(err => console.log('err:', err))
  }

  function onSetFilter(filterBy) {
    setFilterBy(filterBy)
    booksService.setFilterBy(filterBy)
  }

  function onRemoveBook(bookId) {
    booksService.remove(bookId)
      .then(() => {
        setBooks(prevBooks => {
          return prevBooks.filter(book => book.id !== bookId)
        })
      })
      .catch(err => console.log('err:', err))
  }
  
  if (!books) return <div>Loading...</div>
  return (
    <section className="book-index main-layout full">
        <h1>Books</h1>
        <Link to="/book/edit">Add a Book</Link>
        <BooksFilter filterBy={filterBy} onSetFilter={onSetFilter} />
        <BookList books={books} onRemoveBook={onRemoveBook} />
    </section>
  )
}
