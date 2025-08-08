// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function ReviewsList({ hijabId }) {
//     const [reviews, setReviews] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         if (!hijabId) return;

//         setLoading(true);
//         setError(null);

//         axios.get(`http://localhost:5000/api/reviews/${hijabId}`)
//             .then(res => {
//                 setReviews(res.data);
//                 setLoading(false);
//             })
//             .catch(err => {
//                 setError('Failed to load reviews');
//                 console.error(err);
//                 setLoading(false);
//             });
//     }, [hijabId]);

//     if (loading) return <p>Loading reviews...</p>;
//     if (error) return <p style={{ color: 'red' }}>{error}</p>;
//     if (reviews.length === 0) return <p>No reviews for this style yet.</p>;

//     return (
//         <div>
//             <h3>Reviews</h3>
//             {reviews.map((review) => (
//                 <div
//                     key={review._id}
//                     style={{
//                         border: '1px solid #ccc',
//                         padding: '10px',
//                         marginBottom: '10px',
//                         borderRadius: '5px',
//                         backgroundColor: '#fafafa'
//                     }}
//                 >
//                     <strong style={{ display: 'block', marginBottom: '5px' }}>
//                         {review.userId?.name || 'Anonymous'}
//                     </strong>
//                     <p style={{ margin: '5px 0' }}>
//                         Rating: {review.rating} / 5 ⭐
//                     </p>
//                     <p style={{ margin: '5px 0' }}>{review.text}</p>
//                 </div>
//             ))}
//         </div>
//     );
// }

// export default ReviewsList;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

function ReviewsList({ hijabId }) {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingReviewId, setEditingReviewId] = useState(null);
    const [editText, setEditText] = useState('');
    const [editRating, setEditRating] = useState(5);

    const token = localStorage.getItem("token");
    let currentUserId = null;

    if (token) {
        try {
            const decoded = jwt_decode(token);
            console.log("Decoded token:", decoded); // 👈 Debugging
            currentUserId = decoded.userId || decoded._id || decoded.id;
        } catch (e) {
            console.error("Invalid token", e);
        }
    }

    const fetchReviews = () => {
        setLoading(true);
        setError(null);

        axios.get(`${import.meta.env.FrontEnd}/api/reviews/${hijabId}`)
            .then(res => {
                console.log("Fetched reviews:", res.data); // 👈 Debugging
                setReviews(res.data);
                setLoading(false);
            })
            .catch(err => {
                setError('Failed to load reviews');
                console.error(err);
                setLoading(false);
            });
    };

    useEffect(() => {
        if (!hijabId) return;
        fetchReviews();
    }, [hijabId]);

    const handleDelete = async (reviewId) => {
        if (!window.confirm("Are you sure you want to delete this review?")) return;

        try {
            await axios.delete(`http://localhost:5000/api/reviews/${reviewId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            fetchReviews();
        } catch (err) {
            console.error("Delete failed", err);
        }
    };

    const startEditing = (review) => {
        setEditingReviewId(review._id);
        setEditText(review.text);
        setEditRating(review.rating);
    };

    const cancelEditing = () => {
        setEditingReviewId(null);
        setEditText('');
        setEditRating(5);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(
                `${import.meta.env.FrontEnd}/reviews/${editingReviewId}`,
                { text: editText, rating: editRating },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            cancelEditing();
            fetchReviews();
        } catch (err) {
            console.error("Update failed", err);
        }
    };

    if (loading) return <p>Loading reviews...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;
    if (reviews.length === 0) return <p>No reviews for this style yet.</p>;

    return (
        <div>
            <h3 className="text-xl font-semibold mb-4">Reviews</h3>
            {reviews.map((review) => {
                // Handle userId as object or string
                const reviewUserId = typeof review.userId === 'object' ? review.userId?._id : review.userId;
                const isOwner = reviewUserId === currentUserId;
                console.log(isOwner);
                console.log(reviewUserId);
                
                
                return (
                    <div
                        key={review._id}
                        style={{
                            border: '1px solid #ccc',
                            padding: '10px',
                            marginBottom: '10px',
                            borderRadius: '5px',
                            backgroundColor: '#fafafa',
                        }}
                    >
                        <strong style={{ display: 'block', marginBottom: '5px' }}>
                            {review.userId?.name || 'Anonymous'}
                        </strong>

                        {editingReviewId === review._id ? (
                            <form onSubmit={handleEditSubmit}>
                                <textarea
                                    value={editText}
                                    onChange={(e) => setEditText(e.target.value)}
                                    required
                                    rows={3}
                                    style={{ width: '100%', marginBottom: '5px' }}
                                />
                                <select
                                    value={editRating}
                                    onChange={(e) => setEditRating(Number(e.target.value))}
                                    style={{ marginBottom: '5px' }}
                                >
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <option key={star} value={star}>
                                            {star} Star{star > 1 ? 's' : ''}
                                        </option>
                                    ))}
                                </select>
                                <br />
                                <button type="submit">💾 Save</button>
                                <button
                                    type="button"
                                    onClick={cancelEditing}
                                    style={{ marginLeft: '10px' }}
                                >
                                    ❌ Cancel
                                </button>
                            </form>
                        ) : (
                            <>
                                <p style={{ margin: '5px 0' }}>
                                    Rating: {review.rating} / 5 ⭐
                                </p>
                                <p style={{ margin: '5px 0' }}>{review.text}</p>

                                {isOwner && (
                                    <div style={{ marginTop: '8px' }}>
                                        <button
                                            onClick={() => startEditing(review)}
                                            style={{ marginRight: '10px' }}
                                        >
                                            ✏️ Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(review._id)}
                                            style={{ color: 'red' }}
                                        >
                                            🗑️ Delete
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export default ReviewsList;
