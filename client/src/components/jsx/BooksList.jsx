import { useState, useEffect } from "react"
import axios from 'axios'
import BookCard from "./BookCard"
import { toast } from '@yusufceng1z/ding-react'
import { Search } from "lucide-react"
import "../css/BookList.css"

function BooksList() {
    const [book, setBook] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [searchBy, setSearchBy] = useState("name")
    const [category, setCategory] = useState("")
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
            toast.success('Book deleted')
        } catch (error) {
            console.log(error, "error from deleting the book")
        }
    }
    const handleEdit = async (id, price) => {
        try {
            const response = await axios.put(
                `https://6afb5186730c1d152f337677.mockapi.io/api/v1/books/${id}`,
                { price }
            )
            setBook(book.map((item) =>
                item.id === id ? response.data : item
            ))
            toast.success('Price edited')
        } catch (error) {
            console.log(error, "error from updating the book")
        }
    }

    const filteredProducts = book.filter((item) => {
        const matchesSearch = String(item[searchBy])
            .toLowerCase()
            .includes(searchTerm.toLowerCase())

        const matchesCategory = category === "" || item.category === category

        return matchesSearch && matchesCategory
    })
    useEffect(() => {
        bookFetch();
    }, []);
    return (
        <div className="books-page">
            <h1 className="page-title">Explore books</h1>

            <div className="toolbar">
                <div className="search-box">
                    <Search size={16} />
                    <input
                        type="text"
                        placeholder={`Search by ${searchBy}...`}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <select className="filter" value={searchBy} onChange={(e) => setSearchBy(e.target.value)}>
                    <option value="name">Name</option>
                    <option value="price">Price</option>
                    <option value="id">ID</option>
                </select>

                <select className="filter" value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="">All categories</option>
                    <option value="Personal Development">Personal Development</option>
                    <option value="Romance">Romance</option>
                    <option value="Philosophy">Philosophy</option>
                    <option value="Sociology">Sociology</option>
                    <option value="Thriller">Thriller</option>
                    <option value="Islamic">Islamic</option>
                    <option value="Leadership">Leadership</option>
                </select>
            </div>
            {/* ----------video------------ */}
            <section className="promo">
                <video src="/library.mp4" controls muted loop playsInline />
            </section>
            {/* --------------------------- */}
            {filteredProducts.length === 0 ? (
                <p className="empty">No books found</p>
            ) : (
                <div className="books-grid">
                    {filteredProducts.map((books) => (
                        <BookCard
                            key={books.id}
                            books={books}
                            handleDelete={handleDelete}
                            handleEdit={handleEdit}
                        />
                    ))}
                </div>
            )}
        </div>
    )

}

export default BooksList
