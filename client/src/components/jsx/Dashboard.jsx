import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { toast } from "@yusufceng1z/ding-react"
import { Plus } from "lucide-react"
import "../css/Dashboard.css"

const API_URL = "https://6afb5186730c1d152f337677.mockapi.io/api/v1/books"
const LOW_STOCK = 5

function Dashboard() {
    const [books, setBooks] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const fetchBooks = async () => {
        try {
            const response = await axios.get(API_URL)
            setBooks(response.data)
        } catch (error) {
            console.log(error, "error from fetching books")
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchBooks()
    }, [])

    const getStock = (b) => Number(b.stock) || 0

    const restock = async (book) => {
        try {
            const response = await axios.put(`${API_URL}/${book.id}`, {
                stock: getStock(book) + 10,
            })
            setBooks(books.map((b) => (b.id === book.id ? response.data : b)))
            toast.success("Added 10 copies")
        } catch (error) {
            console.log(error, "error from restocking")
        }
    }

    if (isLoading) return <div className="books-page">Loading...</div>

    //sum howa el accumulator
    //b howa el book el hali
    const totalName = books.length
    const totalCopies = books.reduce((sum, b) => sum + getStock(b), 0)
    const stockValue = books.reduce((sum, b) => sum + getStock(b) * Number(b.price || 0), 0)
    const outOfStock = books.filter((b) => getStock(b) === 0)
    const lowStock = books.filter((b) => getStock(b) > 0 && getStock(b) <= LOW_STOCK)
    const savedCount = books.filter((b) => b.saved === true).length

    const toRestock = [...outOfStock, ...lowStock].sort((a, b) => getStock(a) - getStock(b))

    const byCategory = books.reduce((acc, b) => {
        const key = b.category || "Other"
        acc[key] = (acc[key] || 0) + getStock(b)
        return acc
    }, {})
    const maxCategory = Math.max(1, ...Object.values(byCategory))

    return (
        <div className="books-page">
            <h1 className="page-title">Dashboard</h1>

            <div className="stats">
                <div className="stat">
                    <span className="stat-value">{totalName}</span>
                    <span className="stat-label">Titles</span>
                </div>
                <div className="stat">
                    <span className="stat-value">{totalCopies}</span>
                    <span className="stat-label">Copies in stock</span>
                </div>
                <div className="stat">
                    <span className="stat-value">{stockValue} TND</span>
                    <span className="stat-label">Stock value</span>
                </div>
                <div className="stat warn">
                    <span className="stat-value">{lowStock.length + outOfStock.length}</span>
                    <span className="stat-label">Need restocking</span>
                </div>
                <div className="stat">
                    <span className="stat-value">{savedCount}</span>
                    <span className="stat-label">Saved by admin</span>
                </div>
            </div>

            <div className="dash-grid">
                <section className="dash-panel">
                    <h2 className="section-title">Copies by category</h2>
                    {Object.entries(byCategory).map(([name, count]) => (
                        <div key={name} className="bar-row">
                            <span className="bar-name">{name}</span>
                            <div className="bar-track">
                                <div
                                    className="bar-fill"
                                    style={{ width: `${(count / maxCategory) * 100}%` }}
                                />
                            </div>
                            <span className="bar-count">{count}</span>
                        </div>
                    ))}
                </section>

                <section className="dash-panel">
                    <h2 className="section-title">To restock</h2>
                    {toRestock.length === 0 ? (
                        <p className="empty">All books are well stocked</p>
                    ) : (
                        <ul className="restock-list">
                            {toRestock.map((b) => (
                                <li key={b.id} className="restock-item">
                                    <div>
                                        <Link to={`/book/${b.id}/stock`} className="restock-name">
                                            {b.name}
                                        </Link>
                                        <span className={getStock(b) === 0 ? "tag out" : "tag low"}>
                                            {getStock(b) === 0 ? "Out of stock" : `${getStock(b)} left`}
                                        </span>
                                    </div>
                                    <button className="btn-dark" onClick={() => restock(b)}>
                                        <Plus size={13} /> 10
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </section>
            </div>
        </div>
    )
}

export default Dashboard
