// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { useEffect, useState } from 'react';

// const HijabDetail = () => {
//     const { id } = useParams();
//     const [hijab, setHijab] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         console.log("Hijab ID from URL:", id);
//         const fetchHijab = async () => {
//             setLoading(true);
//             setError(null);
//             try {
//                 const response = await axios.get(`http://localhost:5000/api/hijabs/${id}`);
//                 console.log("Hijab data:", response.data);
//                 if (response.data) {
//                     setHijab(response.data);
//                 } else {
//                     setError("Hijab not found.");
//                 }
//             } catch (error) {
//                 console.error('Error fetching hijab:', error);
//                 setError("Failed to fetch hijab details.");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         if (id) {
//             fetchHijab();
//         } else {
//             setError("Invalid Hijab ID.");
//             setLoading(false);
//         }
//     }, [id]);

//     if (loading) return <p>Loading hijab details...</p>;
//     if (error) return <p style={{ color: 'red' }}>{error}</p>;

//     return (
//         <div className="p-4">
//             <h1 className="text-3xl font-bold">{hijab.name}</h1>
//             <img src={hijab.image} alt={hijab.name} className="w-64 mt-4" />
//             <p className="mt-2 text-gray-700">{hijab.description}</p>
//             {/* Add more details here if you want */}
//         </div>
//     );
// };

// export default HijabDetail;
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

const HijabDetail = () => {
    const { id } = useParams();
    const [hijab, setHijab] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loadingHijab, setLoadingHijab] = useState(true);
    const [loadingReviews, setLoadingReviews] = useState(true);
    const [error, setError] = useState(null);
    const [reviewText, setReviewText] = useState("");
    const [reviewRating, setReviewRating] = useState(5);
    const [submitting, setSubmitting] = useState(false);

    const token = localStorage.getItem("token");

    // Fetch hijab details
    useEffect(() => {
        const fetchHijab = async () => {
            setLoadingHijab(true);
            setError(null);
            try {
                const response = await axios.get(`http://localhost:5000/api/hijabs/${id}`);
                setHijab(response.data);
            } catch (error) {
                setError("Failed to fetch hijab details.");
            } finally {
                setLoadingHijab(false);
            }
        };

        if (id) fetchHijab();
    }, [id]);

    // Fetch reviews
    useEffect(() => {
        const fetchReviews = async () => {
            setLoadingReviews(true);
            try {
                const res = await axios.get(`http://localhost:5000/api/reviews/${id}`);
                setReviews(res.data);
            } catch (error) {
                console.error("Error fetching reviews", error);
            } finally {
                setLoadingReviews(false);
            }
        };

        if (id) fetchReviews();
    }, [id]);

    // Submit new review
    // const handleReviewSubmit = async (e) => {
    //     e.preventDefault();
    //     if (!token) {
    //         setError("Please log in to submit a review.");
    //         return;
    //     }

    //     setSubmitting(true);
    //     setError(null);

    //     try {
    //         await axios.post(
    //             `http://localhost:5000/api/reviews/${id}`, // id is hijabId
    //             { text: reviewText, rating: reviewRating } // only text and rating in body
    //             {
    //                 headers: {
    //                     Authorization: `Bearer ${token}`,  // token from localStorage
    //                 },
    //             }
    //         );
    //         setReviewText("");
    //         setReviewRating(5);

    //         // Reload reviews after submit
    //         const updated = await axios.get(`http://localhost:5000/api/reviews/${id}`);
    //         setReviews(updated.data);
    //     } catch (err) {
    //         setError("Failed to submit review. Please try again.");
    //     } finally {
    //         setSubmitting(false);
    //     }
    // };
    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        if (!token) {
            setError("Please log in to submit a review.");
            return;
        }

        setSubmitting(true);
        setError(null);

        try {
            await axios.post(
                `http://localhost:5000/api/reviews/${id}`,
                { text: reviewText, rating: reviewRating },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setReviewText("");
            setReviewRating(5);

            // Reload reviews after submit
            const updated = await axios.get(`http://localhost:5000/api/reviews/${id}`);
            setReviews(updated.data);
        } catch (err) {
            setError("Failed to submit review. Please try again.");
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    };


    if (loadingHijab) return <p>Loading hijab details...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;
    if (!hijab) return <p>Hijab not found.</p>;

    return (
        <div className="p-4 max-w-xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">{hijab.name}</h1>
            <img src={hijab.image} alt={hijab.name} className="w-full max-w-sm rounded-lg mb-4" />
            <p className="mb-6 text-gray-700">{hijab.description}</p>

            <h2 className="text-2xl font-semibold mb-3">Reviews</h2>

            {/* Review Form */}
            <form onSubmit={handleReviewSubmit} className="mb-6 space-y-3">
                <textarea
                    className="w-full border rounded p-2"
                    placeholder="Write your review..."
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    disabled={submitting || !token}
                    required
                    rows={4}
                ></textarea>

                <select
                    className="border rounded p-2"
                    value={reviewRating}
                    onChange={(e) => setReviewRating(Number(e.target.value))}
                    disabled={submitting || !token}
                >
                    {[1, 2, 3, 4, 5].map((star) => (
                        <option key={star} value={star}>
                            {star} Star{star > 1 ? "s" : ""}
                        </option>
                    ))}
                </select>

                <button
                    type="submit"
                    disabled={submitting || !token}
                    className={`bg-blue-600 text-white px-4 py-2 rounded ${submitting || !token ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                >
                    {submitting ? "Submitting..." : "Submit Review"}
                </button>
            </form>

            {/* Reviews List */}
            {loadingReviews ? (
                <p>Loading reviews...</p>
            ) : reviews.length > 0 ? (
                reviews.map((review) => (
                    <div key={review._id} className="border rounded p-3 mb-3 shadow">
                        <p className="text-sm text-gray-600 mb-1">Rating: {review.rating} / 5</p>
                        <p>{review.text}</p>
                    </div>
                ))
            ) : (
                <p>No reviews yet. Be the first to review!</p>
            )}
        </div>
    );
};

export default HijabDetail;
