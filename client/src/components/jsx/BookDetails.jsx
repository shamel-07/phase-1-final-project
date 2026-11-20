import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "@yusufceng1z/ding-react";
import { Bookmark, Star, Package } from "lucide-react";
import "../css/BookDetails.css"

const BookDetails = () => {
    const { id } = useParams();
    const [details, setDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate();

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

    const handleSave = async () => {
        try {
            await axios.put(
                `https://6afb5186730c1d152f337677.mockapi.io/api/v1/books/${id}`,
                { saved: true }
            );
            toast.success("Book saved");
            navigate("/saved");
        } catch (error) {
            console.log(error, "error from saving the book");
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!details) {
        return <div>Book not found.</div>;
    }

    return (
        <div className="details">
            <section className="details-hero">
                {details.image && (
                    <img className="details-cover" src={details.image} alt={details.name} />
                )}
                <div className="details-info">
                    <h1 className="details-title">{details.name}</h1>
                    <h3 className="details-author">{details.creator}</h3>
                    <p className="details-tagline">{details.description}</p>
                </div>
            </section>

            <section className="details-panel">
                <div className="details-actions">
                    <button className="save-btn" onClick={handleSave}>
                        <Bookmark size={15} /> Save book
                    </button>
                    <Link className="save-btn" to={`/book/${id}/stock`}>
                <Package size={15} /> Manage stock
            </Link>
                    <span className="chip"><Star size={13} /> {details.rating}/5</span>
                    <span className="chip">{details.price} TND</span>
                </div>

                <div className="details-body">
                    <div className="details-main">
                        <h4 className="section-title">Description</h4>
                        <article>{details.bookDesc}</article>

                        <div className="author">
                            {details.avatar && (
                                <img className="avatar" src={details.avatar} alt={details.creator} />
                            )}
                            <div>
                                <h5 className="author-name">{details.creator}</h5>
                                <p className="details-content">{details.creatorDesc}</p>
                            </div>
                        </div>
                    </div>

                    <aside className="meta">
                        <div className="meta-item">
                            <h4 className="section-title">Category</h4>
                            <p>{details.category}</p>
                        </div>
                        <div className="meta-item">
                            <h4 className="section-title">Language</h4>
                            <p>{details.language}</p>
                        </div>
                        <div className="meta-item">
                            <h4 className="section-title">Date</h4>
                            <p>{details.date}</p>
                        </div>
                        <div className="meta-item">
                            <h4 className="section-title">Contact</h4>
                            <p>{details.contact}</p>
                        </div>
                    </aside>
                </div>
            </section>
        </div>
    )
}

export default BookDetails