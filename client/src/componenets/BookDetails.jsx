import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BookDetails = () => {
    const { id } = useParams();
    const [details, setDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const fetchData = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(
                `https://6afb5186730c1d152f337677.mockapi.io/api/v1/books/${id}`
            );
            setDetails(response.data);
        } catch (error) {
            console.log(error, "error from fetching data");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!details) {
        return <div>Book not found.</div>;
    }


return (
        <div className="details">
            {details.image && (
                <img className="details-cover" src={details.image} alt={details.name} />
            )}
            <h1>{details.name}</h1>

            <div className="avatar">
                {details.avatar && (
                    <img className="avatar" src={details.avatar} alt={details.creator} />
                )}
                <span>By {details.creator}</span>
            </div>

            <div className="meta">
                <span>Category: {details.category}</span>
                <span>Date: {details.date}</span>
                <span>language: {details.language}</span>
          
            </div>

                 <img className="avatar" src={details.avatar} alt={details.avatar} />
                <p>Description:{details.description}</p>
                <p>Price:{details.price}</p>
                <p>Rating:{details.rating}</p>
                <h1>Contact:{details.contact}</h1>
                <img className="avatar" src={details.creator} alt={details.creator} />
                <h2>createDesc:{details.creatorDesc}</h2>
                <h3>bookDesc:{details.bookDesc}</h3>


            <p className="details-content">{details.creatorDesc}</p>
            <article>{details.bookDesc}</article>
        </div>
    )
}

export default BookDetails
