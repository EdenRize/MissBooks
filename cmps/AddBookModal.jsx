import {booksService} from '../services/books-service.js'

const { useState, useEffect } = React

export function AddBookModal({onClose, onAdd}) {
    const [newBookProps, setNewBookProps] = useState({title: 'New Book', price: 70, pageCount: 100, publishedDate: 2023, language: 'en', isOnSale: false})

    useEffect(()=>{
        setNewBookProps(newBookProps)
    }, [newBookProps])



    function onAddBook(ev){
        ev.preventDefault()
        booksService.save(booksService.getEmptyBook(title,price,publishedDate,pageCount,language,isOnSale))
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
    const inputs = [
        {
          htmlFor: 'title',
          label: 'Title:',
          type: 'text',
          name: 'title',
          id: 'title',
          value: title,
        },
        {
          htmlFor: 'price',
          label: 'Price:',
          type: 'number',
          name: 'price',
          id: 'price',
          value: price,
        },
        {
          htmlFor: 'pageCount',
          label: 'Page Count:',
          max: 1000,
          type: 'number',
          name: 'pageCount',
          id: 'pageCount',
          value: pageCount,
        },
        {
          htmlFor: 'publishedDate',
          label: 'Published Date:',
          type: 'number',
          name: 'publishedDate',
          id: 'publishedDate',
          value: publishedDate,
        },
        {
          htmlFor: 'language',
          label: 'Language:',
          type: 'text',
          name: 'language',
          id: 'language',
          value: language,
        },
      ]

  return (
    <section className="add-book-modal">
      <div onClick={onClose} className="black-screen"></div>

      <div onClick={(event) => event.stopPropagation()} className="add-book-modal-container">
        <h2>Add a Book</h2>
        <form onSubmit={onAddBook}>
            { inputs.map(input=> {
              return <React.Fragment key={input.id}>
                    <label htmlFor={input.htmlFor}>{input.label}</label>
                    <input required max={input.max }  type={input.type} value={input.value} name={input.name} id={input.id} onChange={handleChange} />
                </React.Fragment>
            })}

        <label htmlFor="isOnSale">Is On Sale:  <input value={isOnSale} onChange={handleChange} type="checkbox" id="isOnSale" name="isOnSale" /> </label>
           

        <button>Add Book</button>
        </form>
        <img onClick={onClose} src="../assets/img/close.svg"/>
            </div>
    </section>
  )
}
