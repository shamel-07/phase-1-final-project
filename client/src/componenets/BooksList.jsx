import { useState, useEffect } from "react"
import axios from 'axios'
import BookCard from "./BookCard"

function BooksList() {
    const [book, setBook] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [searchBy, setSearchBy] = useState("name")
    const bookFetch = async () => {
        try {
            const response = await axios.get("https://6afb5186730c1d152f337677.mockapi.io/api/v1/books")
            setBook(response.data)
        } catch (error) {
            console.log(error, "error from fetching data");
        }
    }
    const handleDelete = async (id) => {
        try {
            await axios.delete(
                `https://6afb5186730c1d152f337677.mockapi.io/api/v1/books/${id}`
            )
            setBook(book.filter((item) => item.id !== id))
        } catch (error) {
            console.log(error, "error from deleting the book")
        }
    }
    const handleEdit = async (id, price) => {
        try {
            const response =await axios.put(
                `https://6afb5186730c1d152f337677.mockapi.io/api/v1/books/${id}`,
                {price}
            )
            return setBook(book.map((item)=> {
                item.id === id ? response.data : item
            }))
        } catch (error) {
            console.log(error, "error from updating the book")
        }
    }
    useEffect(() => {
        bookFetch();
    }, []);
    const filteredProducts = book.filter((item) =>
        String(item[searchBy]).toLowerCase().includes(searchTerm.toLowerCase())
    )
    return (
        <div>
            <select value={searchBy} onChange={(e) => setSearchBy(e.target.value)}>
                <option value="name">Name</option>
                <option value="price">Price</option>
                <option value="id">ID</option>
            </select>

            <input
                type="text"
                placeholder={`Search by ${searchBy}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            {filteredProducts.length === 0 ? (
                <p>No products found</p>
            ) : (
                filteredProducts.map((books) => (
                    <BookCard
                        key={books.id}
                        books={books}
                        handleDelete={handleDelete}
                        handleEdit={handleEdit}
                    />
                    
                ))
            )}
        </div>
    )
}

export default BooksList
