
export function BookAddList({books}) {
    console.log('books',books)
  return (
    <ul className="book-add-list">
        {books.map(book => {
            return <li key={book.id}>
                <p>{book.volumeInfo.title}</p>
            </li>
        })}
    </ul>
  )
}
