import { useState, useEffect } from "react"
import axios from 'axios'
import BookCard from "./BookCard"

function BooksList() {
    const [book, setBook] = useState([])
    const bookFetch = async () => {
        try {
            const response = await axios.get("https://6afb5186730c1d152f337677.mockapi.io/api/v1/books")
            setBook(response.data)
        } catch (error) {
            console.log(error, "error from fetching data");
        }
    }
    useEffect(() => {
        bookFetch();
    }, []);
    return (
        <div>
            {book.map((books) => (
                <BookCard key={books.id} books={books}
                />
            ))}
        </div>
    )
}

export default BooksList
