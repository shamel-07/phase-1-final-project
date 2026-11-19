import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { toast } from "@yusufceng1z/ding-react"
import { Star, Trash2 } from "lucide-react"

const API_URL = "https://6afb5186730c1d152f337677.mockapi.io/api/v1/books"

function SavePage() {
    const [savedBooks, setSavedBooks] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const fetchSaved = async () => {
        try {
            const response = await axios.get(API_URL)
            setSavedBooks(response.data.filter((item) => item.saved === true))
        } catch (error) {
            console.log(error, "error from fetching saved books")
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchSaved()
    }, [])

    const handleRemove = async (id) => {
        try {
            await axios.put(`${API_URL}/${id}`, { saved: false })
            setSavedBooks(savedBooks.filter((item) => item.id !== id))
            toast.success("Book removed from saved")
        } catch (error) {
            console.log(error, "error from removing saved book")
        }
    }

    if (isLoading) return <div className="books-page">Loading...</div>

    return (
        <div className="books-page">
            <h1 className="page-title">Saved books</h1>

            {savedBooks.length === 0 ? (
                <p className="empty">No saved books yet</p>
            ) : (
                <div className="books-grid">
                    {savedBooks.map((book) => (
                        <div key={book.id} className="book-card">
                            <Link to={`/book/${book.id}`} className="book-cover">
                                {book.image ? (
                                    <img src={book.image} alt={book.name} />
                                ) : (
                                    <div className="cover-placeholder">No cover</div>
                                )}
                            </Link>

                            <div className="book-info">
                                <Link className="book-name" to={`/book/${book.id}`}>
                                    {book.name}
                                </Link>
                                <p className="book-author">{book.creator}</p>

                                <div className="book-tags">
                                    {book.category && <span className="chip">{book.category}</span>}
                                    <span className="chip">
                                        <Star size={12} /> {book.rating}/5
                                    </span>
                                </div>

                                <p className="book-price">Price: {book.price} TND</p>

                                <div className="card-actions">
                                    <button
                                        className="btn-light btn-danger"
                                        onClick={() => handleRemove(book.id)}
                                    >
                                        <Trash2 size={13} /> Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default SavePage