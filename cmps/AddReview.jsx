const { useState, useEffect } = React
import { utilService } from '../services/util.service.js'

export function AddReview({ onAddReview}) {
    const [review, setReview] = useState({fullName: '', rating: 5, readAt: utilService.formatDate(new Date())})

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

  const {fullName, rating, readAt} = review
  return (
    <section className="add-review">
        <h2>Add a Book Review</h2>

        <form onSubmit={event => { event.preventDefault(); onAddReview(review)}}>
            <label>Full Name: <input required onChange={handleInputChange} value={fullName} name='fullName' type="text" placeholder="Full Name" /></label>
            <label>Rating: <input onChange={handleInputChange} value={rating} name='rating' title="" type="range" min="0" max="5" /></label>
            <label>Read At: <input required onChange={handleInputChange} value={readAt} name='readAt' type="date" /></label>
            <button>Add Review</button>
        </form>
    </section>
  )
}
