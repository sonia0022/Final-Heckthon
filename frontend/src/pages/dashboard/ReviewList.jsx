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

//         axios.get(`/reviews/${hijabId}`)
//             .then(res => {
//                 setReviews(res.data);
//                 setLoading(false);
//             })
//             .catch(err => {
//                 setError('Failed to load reviews');
//                 console.log(err);
                
//                 setLoading(false);
//             });
//     }, [hijabId]);

//     if (loading) return <p>Loading reviews...</p>;
//     if (error) return <p>{error}</p>;
//     if (reviews.length === 0) return <p>No reviews for this style yet.</p>;

//     return (
//         <div>
//             <h3>Reviews</h3>
//             <ul>
//                 {reviews.map(review => (
//                     <li key={review._id} style={{ marginBottom: '1rem', borderBottom: '1px solid #ccc', paddingBottom: '0.5rem' }}>
//                         <strong>{review.userId?.name || 'Anonymous'}</strong><br />
//                         <span>{review.text}</span><br />
//                         <span>Rating: {review.rating} ⭐</span>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }

// export default ReviewsList;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ReviewsList({ hijabId }) {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!hijabId) return;

        setLoading(true);
        setError(null);

        axios.get(`http://localhost:5000/api/reviews/${hijabId}`)
            .then(res => {
                setReviews(res.data);
                setLoading(false);
            })
            .catch(err => {
                setError('Failed to load reviews');
                console.error(err);
                setLoading(false);
            });
    }, [hijabId]);

    if (loading) return <p>Loading reviews...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;
    if (reviews.length === 0) return <p>No reviews for this style yet.</p>;

    return (
        <div>
            <h3>Reviews</h3>
            {reviews.map((review) => (
                <div
                    key={review._id}
                    style={{
                        border: '1px solid #ccc',
                        padding: '10px',
                        marginBottom: '10px',
                        borderRadius: '5px',
                        backgroundColor: '#fafafa'
                    }}
                >
                    <strong style={{ display: 'block', marginBottom: '5px' }}>
                        {review.userId?.name || 'Anonymous'}
                    </strong>
                    <p style={{ margin: '5px 0' }}>
                        Rating: {review.rating} / 5 ⭐
                    </p>
                    <p style={{ margin: '5px 0' }}>{review.text}</p>
                </div>
            ))}
        </div>
    );
}

export default ReviewsList;
