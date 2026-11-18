
function BookCard({books}) {

    return (
        <div>
            <h1>{books.name}</h1>
            <h3>{books.creator}</h3>
            <p>{books.id}</p>
            <p>{books.description}</p>
            <p>{books.price}</p>
            <p>{books.date}</p>
            <p>{books.rating}</p>
            <p>{books.contact}</p>
            <img src={books.image} alt={books.name} />
            <img src={books.avatar} alt="avatar" />        
          <button
            className="More infos click on me "
            onClick={() => onClick(books.description)}
          >
            Click Me
          </button>
        </div>
    )
}

export default BookCard
