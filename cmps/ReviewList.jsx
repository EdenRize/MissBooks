
export function ReviewList({ reviews, onDelete }) {

    if(!reviews) return <p className="review-list">No reviews yet</p>
  return (
    <table className="review-list">
        <thead>
            <tr>
                <td>Full Name</td>
                <td>Rating</td>
                <td>Read At</td>
                <td></td>
            </tr>
        </thead>

        <tbody>
            {reviews.map(review => {
                return <tr key={review.id}>
                    <td>{review.fullName}</td>
                    <td>{review.rating}</td>
                    <td>{review.readAt}</td>
                    <td><img onClick={() => onDelete(review.id)} src="./assets/img/delete.svg" /></td>
                </tr>
            })}
        </tbody>
    </table>
  )
}
