const { useState, useEffect, useRef } = React
import { utilService } from "../services/util.service.js"
import { booksService } from '../services/books-service.js'
import { googleService } from '../services/google-service.js'
import { BookAddList } from "../cmps/BookAddList.jsx"

export function BookAdd() {
  const [userSearch, setUserSearch] = useState('')
  const [books, setBooks] = useState(null)
  const debounceOnSearch = useRef(utilService.debounce(onGetBooks, 1500))

  function onUserSearch(ev) {
    ev.preventDefault()
    const search = ev.target.value
    setUserSearch(search)
    debounceOnSearch.current(search)
  }

  function onGetBooks(search){
    console.log('search',search)
    googleService.getGoogleBooks(search)
      .then(setBooks)
  }

  return (
    <section className="book-add">
        <h1>book add</h1>
        <form>
        <input value={userSearch} onChange={onUserSearch} type="text" placeholder="Search" />
        <button>Search</button>
        </form>

        {books && <BookAddList books={books} />}
    </section>
  )
}
