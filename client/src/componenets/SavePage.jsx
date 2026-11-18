import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { toast } from "@yusufceng1z/ding-react"

function SavePage() {
    const [savedBooks, setSavedBooks] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const fetchSaved = async () => {
        try {
            const response = await axios.get("https://6afb5186730c1d152f337677.mockapi.io/api/v1/books")
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
            await axios.put(`${"https://6afb5186730c1d152f337677.mockapi.io/api/v1/books"}/${id}`, { saved: false })
            setSavedBooks(savedBooks.filter((item) => item.id !== id))
            toast.success("Book removed from saved")
        } catch (error) {
            console.log(error, "error from removing saved book")
        }
    }

    if (isLoading) return <div>Loading...</div>

    return (
        <div className="savepage">
            <h1>Saved Books</h1>

            {savedBooks.length === 0 ? (
                <p>No saved books yet</p>
            ) : (
                savedBooks.map((book) => (
                    <div key={book.id} className="details">
                        {book.image && (
                            <img className="details-cover" src={book.image} alt={book.name} />
                        )}
                        <h2>
                            <Link to={`/book/${book.id}`}>{book.name}</Link>
                        </h2>

                        <div className="avatar">
                            {book.avatar && (
                                <img className="avatar" src={book.avatar} alt={book.creator} />
                            )}
                            <span>By {book.creator}</span>
                        </div>

                        <div className="meta">
                            <span>Category: {book.category}</span>
                            <span>Date: {book.date}</span>
                            <span>Language: {book.language}</span>
                            <span>Price: {book.price}</span>
                            <span>Rating: {book.rating}</span>
                        </div>

                        <p className="details-content">{book.creatorDesc}</p>
                        <article>{book.bookDesc}</article>

                        <button onClick={() => handleRemove(book.id)}>Delete</button>
                    </div>
                ))
            )}
        </div>
    )
}

export default SavePage