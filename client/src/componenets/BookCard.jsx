import { useState } from "react"

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
        <div>
            <h1>{books.name}</h1>
            <h3>{books.creator}</h3>
            <p>{books.id}</p>
            <p>{books.description}</p>
            <p>{books.date}</p>
            <p>{books.rating}</p>
            <p>{books.contact}</p>
            <p>{books.language}</p>
            <p>{books.bookDesc}</p>
            <p>{books.creatorDesc}</p>
            {books.image && <img src={books.image} alt={books.name} />}
            {books.avatar && <img src={books.avatar} alt="avatar" />}
            {isEditing ? (
                <>
                    <textarea
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    <button onClick={handleSave}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                </>
            ) : (
                <>
                    <p>{books.price}</p>
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                </>
            )}
            <button onClick={() => handleDelete(books.id)}>Delete</button>
        </div>
    )
}

export default BookCard
