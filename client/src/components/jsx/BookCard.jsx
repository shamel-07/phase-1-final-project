import { useState } from "react"
import { Link } from "react-router-dom"
import { Star, Pencil, Trash2 } from "lucide-react"

function BookCard({ books, handleDelete, handleEdit }) {
    const [isEditing, setIsEditing] = useState(false)
    const [price, setPrice] = useState(books.price)

    const handleSave = async () => {
        await handleEdit(books.id, price)
        setIsEditing(false)
    }

    const handleCancel = () => {
        setPrice(books.price)
        setIsEditing(false)
    }

    return (
        <div className="book-card">
            <Link to={`/book/${books.id}`} className="book-cover">
                {books.image ? (
                    <img src={books.image} alt={books.name} />
                ) : (
                    <div className="cover-placeholder">No cover</div>
                )}
            </Link>

            <div className="book-info">
                <Link className="book-name" to={`/book/${books.id}`}>
                    {books.name}
                </Link>
                <p className="book-author">{books.creator}</p>

                <div className="book-tags">
                    {books.category && <span className="chip">{books.category}</span>}
                    <span className="chip">
                        <Star size={12} /> {books.rating}/5
                    </span>
                </div>

                {isEditing ? (
                    <div className="edit-row">
                        <input
                            type="number"
                            className="price-input"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        <button className="btn-dark" onClick={handleSave}>Save</button>
                        <button className="btn-light" onClick={handleCancel}>Cancel</button>
                    </div>
                ) : (
                    <p className="book-price">Price: {books.price} TND</p>
                )}

                <div className="card-actions">
                    {!isEditing && (
                        <button className="btn-light" onClick={() => setIsEditing(true)}>
                            <Pencil size={13} /> Edit
                        </button>
                    )}
                    <button className="btn-light btn-danger" onClick={() => handleDelete(books.id)}>
                        <Trash2 size={13} /> Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default BookCard