import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';
import { useNavigate } from 'react-router-dom';
const apiUrl = import.meta.env.VITE_API_BASE_URL;

export default function ConfNewAcc() {

    const fetchAdminName = async (userId) => {
        try {
            const response = await fetch(`${apiUrl}/users/${userId}`);
            const data = await response.json();
            if (response.ok) {
                return data.data;
            } else {
                console.error('Error fetching admin name:', data.error);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    

    return (
        <div className="poppins-font pt-[6rem] text-center">
            <h1 className='font-bold text-[2rem] text-text dark:text-dark-text'>¡Bienvenido!</h1>
            <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
                Default
            </button>

        </div>
    );
}
