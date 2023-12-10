import { BookDetails } from '../pages/BookDetails.jsx'
import { BookList } from '../cmps/BookList.jsx'
import { BooksFilter } from '../cmps/BooksFilter.jsx'
import {booksService} from '../services/books-service.js'
import { AddBook } from '../cmps/AddBook.jsx'

const { useState, useEffect } = React

export function BookIndex() {
  const [books, setBooks] = useState(null)
  const [selectedBookId, setSelectedBookId] = useState(null)
  const [filterBy, setFilterBy] = useState(booksService.getFilterBy())
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

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

  function onSelectedBookId(bookId) {
    setSelectedBookId(bookId)
    setIsAddModalOpen(false)
  }

  if (!books) return <div>Loading...</div>
  return (
    <section className="book-index">
        {!selectedBookId &&
        <React.Fragment>
        <h1>Books</h1>
        <button onClick={() => setIsAddModalOpen(true)}>Add a Book</button>
        <BooksFilter filterBy={filterBy} onSetFilter={onSetFilter} />
        <BookList books={books} onSelectedBookId={onSelectedBookId} onRemoveBook={onRemoveBook} />
        {isAddModalOpen && <AddBook onClose={() => setIsAddModalOpen(false)} onAdd={loadBooks} />}
        </React.Fragment>
        }
        {selectedBookId && <BookDetails bookId={selectedBookId} onBack={() => setSelectedBookId(null)} />}
    </section>
  )
}
