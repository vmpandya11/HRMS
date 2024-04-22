import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Protected({ Cmp }) {
    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (!user) {
            navigate('/login');
        }
    }, [navigate]);

    return <Cmp />;
}
