import {booksService} from '../services/books-service.js'

const { useState, useEffect } = React

export function AddBook({onClose, onAdd}) {
    const [newBookProps, setNewBookProps] = useState({title: 'New Book', price: 70, pageCount: 100, publishedDate: 2023, language: 'en', isOnSale: false})

    useEffect(()=>{
        setNewBookProps(newBookProps)
    }, [newBookProps])

    function onAddBook(ev){
        ev.preventDefault()
        booksService.save(booksService.getEmptyBook(newBookProps.title, newBookProps.price, newBookProps.publishedDate, newBookProps.pageCount, newBookProps.language, newBookProps.isOnSale))
        .then(() => {
            onAdd()
            onClose()
        })
        
    }

      function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break

            default:
                break;
        }

        setNewBookProps(prevBookProps => ({ ...prevBookProps, [field]: value }))
        

    }

    const { title, price, pageCount, publishedDate, language, isOnSale} = newBookProps
  return (
    <section className="add-book">
        <form onSubmit={onAddBook}>

        <label htmlFor="title">Title: </label>
        <input value={title} onChange={handleChange} type="title" id="title" name="title" />

        <label htmlFor="price">Price: </label>
            <input value={price} onChange={handleChange} type="number" id="price" name="price" />

        <label htmlFor="pageCount">Page Count: </label>
            <input value={pageCount} onChange={handleChange} type="number" id="pageCount" name="pageCount" />

        <label htmlFor="publishedDate">Published Date: </label>
            <input value={publishedDate} onChange={handleChange} type="number" id="publishedDate" name="publishedDate" />

        <label htmlFor="language">Language: </label>
            <input value={language} onChange={handleChange} type="text" id="language" name="language" />

        <label htmlFor="isOnSale">Is On Sale:  <input value={isOnSale} onChange={handleChange} type="checkbox" id="isOnSale" name="isOnSale" /> </label>
           

        <button formAction='submit'>Add Book</button>
        </form>
        <img onClick={onClose} src="../assets/img/close.svg"/>
    </section>
  )
}
