import {booksService} from '../services/books-service.js'

const { useState, useEffect } = React

export function AddBook({onClose, onAdd}) {
    const [newBookProps, setNewBookProps] = useState({title: '', price: 70})

    useEffect(()=>{
        setNewBookProps(newBookProps)
    }, [newBookProps])

    function onAddBook(ev){
        ev.preventDefault()
        booksService.save(booksService.getEmptyBook(newBookProps.title, newBookProps.price))
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

    const { title, price} = newBookProps
  return (
    <section className="add-book">
        <form onSubmit={onAddBook}>
        <label htmlFor="title">Title: </label>
        <input value={title} onChange={handleChange} type="title" id="title" name="title" />

        <label htmlFor="price">Price: </label>
            <input value={price} onChange={handleChange} type="price" id="price" name="price" />
        <button formAction='submit'>Add Book</button>
        </form>

        <img onClick={onClose} src="../assets/img/close.svg"/>
    </section>
  )
}
