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

  if (!books) return <div>Loading...</div>
  return (
    <section className="book-index">
        <h1>Books</h1>
        <BooksFilter filterBy={filterBy} onSetFilter={onSetFilter} />
        <BookList books={books} />
    </section>
  )
}
