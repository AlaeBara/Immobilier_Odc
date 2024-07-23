import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProtectRoutes = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('http://localhost:8000/check_authenticateToken', {}, {
                    withCredentials: true 
                });

                if (response.status != 200) {
                    navigate('/');
                } 
            } catch (error) {
                console.error('Error fetching user data:', error);
                navigate('/');
            }
        };

        fetchData();
    }, [navigate]);


    return <>{children}</>;
}

export default ProtectRoutes;
