import { booksService } from '../services/books-service.js'
import { StarRating } from './StarRating.jsx'
const { useState } = React

export function AddReview({ addReview }) {
    const [review, setReview] = useState(booksService.getEmptyReview())

    function handleInputChange({ target }) {
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

        setReview(prevReview => ({ ...prevReview, [field]: value }))
    }

    function onAddReview(ev) {
        ev.preventDefault()
        addReview(review)
        setReview(booksService.getEmptyReview())
    }

  const {fullName, rating, readAt} = review
  return (
    <section className="add-review">
        <h2>Add a Book Review</h2>

        <form onSubmit={onAddReview}>
            <label>Full Name: <input required onChange={handleInputChange} value={fullName} name='fullName' type="text" placeholder="Full Name" /></label>
            <StarRating handleChange={handleInputChange} />
            {/* <label>Rating: <input onChange={handleInputChange} value={rating} name='rating' title={rating} type="range" min="0" max="5" /></label> */}
            <label>Read At: <input required onChange={handleInputChange} value={readAt} name='readAt' type="date" /></label>
            <button>Add Review</button>
        </form>
    </section>
  )
}
