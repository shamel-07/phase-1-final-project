import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import axios from "axios"
import { toast } from "@yusufceng1z/ding-react"
import { ArrowLeft, Plus, Minus } from "lucide-react"
import "../css/StockPage.css"

const API_URL = "https://6afb5186730c1d152f337677.mockapi.io/api/v1/books"
const LOW_STOCK = 5

function StockPage() {
    const { id } = useParams()
    const [book, setBook] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [amount, setAmount] = useState(1)

    const fetchBook = async () => {
        try {
            const response = await axios.get(`${API_URL}/${id}`)
            setBook(response.data)
        } catch (error) {
            console.log(error, "error from fetching the book")
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchBook()
    }, [id])

    const stock = Number(book?.stock) || 0

    const updateStock = async (newStock) => {
        if (newStock < 0) return
        try {
            const response = await axios.put(`${API_URL}/${id}`, { stock: newStock })
            setBook(response.data)
            toast.success("Stock updated")
        } catch (error) {
            console.log(error, "error from updating the stock")
        }
    }

    if (isLoading) return <div className="stock">Loading...</div>
    if (!book) return <div className="stock">Book not found.</div>

    const status =
        stock === 0 ? "out" : stock <= LOW_STOCK ? "low" : "ok"
    const statusText = {
        out: "Out of stock",
        low: "Low stock",
        ok: "In stock",
    }[status]

    return (
        <div className="stock">
            <Link to={`/book/${id}`} className="stock-back">
                <ArrowLeft size={15} /> Back to book
            </Link>

            <h1 className="stock-title">Manage stock</h1>

            <div className="stock-card">
                {book.image && (
                    <img className="stock-cover" src={book.image} alt={book.name} />
                )}

                <div className="stock-info">
                    <h2 className="stock-book">{book.name}</h2>
                    <p className="stock-author">{book.creator}</p>

                    <div className="stock-count">
                        <span className="stock-number">{stock}</span>
                        <span className="stock-label">copies available</span>
                    </div>

                    <span className={`stock-status ${status}`}>{statusText}</span>

                    <div className="stock-controls">
                        <button
                            className="btn-light"
                            onClick={() => updateStock(stock - 1)}
                        >
                            <Minus size={14} /> 1
                        </button>
                        <button className="btn-dark" onClick={() => updateStock(stock + 1)}>
                            <Plus size={14} /> 1
                        </button>
                    </div>

                    <div className="stock-bulk">
                        <input
                            type="number"
                            min="1"
                            className="price-input"
                            value={amount}
                            onChange={(e) => setAmount(Math.max(1, Number(e.target.value) || 1))}
                        />
                        <button className="btn-light" onClick={() => updateStock(stock + amount)}>
                            Add {amount}
                        </button>
                        <button
                            className="btn-light btn-danger"
                            onClick={() => updateStock(Math.max(0, stock - amount))}
                            disabled={stock === 0}
                        >
                            Remove {amount}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StockPage
