const { useState, useEffect } = React

export function BooksFilter({ filterBy, onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
    
    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])


    function onSetFilterBy(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
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

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    const { txt, maxPrice } = filterByToEdit
  return (
    <section className="books-filter">
        <h2>Filter Our Books</h2>
        <form onSubmit={onSetFilterBy} >
            <label htmlFor="txt">Title: </label>
            <input value={txt} onChange={handleChange} type="text" id="txt" name="txt" />

            <label htmlFor="maxPrice">maxPrice: </label>
            <input value={maxPrice || ''} onChange={handleChange} type="number" id="maxPrice" name="maxPrice" />

            <button>Submit</button>
        </form>
    </section>
  )
}
