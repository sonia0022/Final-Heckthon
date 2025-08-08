// components/HijabList.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const HijabList = () => {
    const [hijabs, setHijabs] = useState([]);

    useEffect(() => {
        const fetchHijabs = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/hijabs`);
                setHijabs(res.data);
            } catch (err) {
                console.error('Error fetching hijabs:', err);
            }
        };

        fetchHijabs();
    }, []);

    return (
        <div className="hijab-list-container">
            <h2 className="title">Hijab Styles</h2>
            <div className="hijab-cards">
                {hijabs.map((hijab) => (
                    <div className="card" key={hijab._id}>
                        <img src={hijab.image} alt={hijab.name} className="card-img" />
                        <div className="card-body">
                            <Link to={`/dashboard/hijabs/${hijab._id}`}>
                                <h2 className="text-xl font-semibold text-blue-600">{hijab.name}</h2>
                            </Link>
                            <p className="card-desc">{hijab.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HijabList;
