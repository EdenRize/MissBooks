import { LongTxt } from '../cmps/LongText.jsx'
import {booksService} from '../services/books-service.js'

const { useState, useEffect } = React

export function BookDetails({bookId, onBack}) {
    const [book, setBook] = useState(null)

    useEffect(() => {
        booksService.get(bookId)
            .then(setBook)
    }, [])

    function getYearDesc(publishedDate) {
        return new Date().getFullYear() - publishedDate > 10 ? <span>Vintage</span> : <span>New</span>
    }

    function getPageCountDesc(pageCount) {
        if(pageCount > 500) return '(Serious Reading)'
        else if(pageCount > 200) return '(Descent Reading)'
        else if(pageCount < 100) return '(Light Reading)'
  
    }

    function getPriceClass(price) {
       return price > 150 ?  'red' : price < 20 ? 'green' : ''
    }

  if(!book) return <section>Loading...</section>
  return (
    <section className="book-details main-layout full">
        <h1>Title: {book.title}</h1>
        <h3>Authors:
            {book.authors.map((author, idx) => {
               return <span key={idx}>{author}</span>
            })}
        </h3>
        <p>Published At: {book.publishedDate} ({getYearDesc(book.publishedDate)})</p>
        <p>Price: <span className={getPriceClass(book.listPrice.amount)}> {new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: book.listPrice.currencyCode,
        }).format(book.listPrice.amount)}
        </span>
        </p>
        {book.listPrice.isOnSale && <p>On Sale!</p>}
        <p>Page Count: {book.pageCount} {getPageCountDesc(book.pageCount)}</p>
        <LongTxt txt={book.description} />

        <img className='book-img' src={book.thumbnail}/>

       <img onClick={onBack} className='back-img' src="./assets/img/back.svg"/>
    </section>
  )
}
