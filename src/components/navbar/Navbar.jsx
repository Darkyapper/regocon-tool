import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBell, FaUser, FaCheck, FaSun, FaMoon } from 'react-icons/fa';
import './Navbar.css';
import logo from '../../assets/regcon-tool-logo-white.png';

export default function Navbar() {
    // Estado para el modo oscuro
    const [isDarkMode, setIsDarkMode] = useState(() => {
        return localStorage.getItem('theme') === 'dark';
    });

    // Obtener datos del administrador
    const adminId = localStorage.getItem('user_id');
    const adminPicture = localStorage.getItem('admin_picture') || 'https://pbs.twimg.com/media/Gbmg1syWgAAcmGW?format=png&name=360x360';

    // Efecto para aplicar la clase `dark` al <html>
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode]);

    // Función para cambiar el modo oscuro
    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <nav className="custom-navbar dark:border-b dark:border-gray-600 bg-background dark:bg-dark-background fixed top-0 left-0 w-full z-50 shadow-md shadow-text/900">
            <div className="max-w-screen-xl mx-auto px-4 py-3 flex justify-between items-center">
                <div className="flex items-center">
                    <img src={logo} className="custom-logo" alt="RegCon Logo" />
                </div>

                <div className="custom-icons flex items-center space-x-4">
                    <button className="notis hover:text-secondary dark:hover:text-dark-accent">
                        <FaBell />
                    </button>
                    <button className="notis hover:text-secondary dark:hover:text-dark-accent">
                        <FaCheck />
                    </button>

                    {/* Botón de cambio de tema */}
                    <button
                        onClick={toggleDarkMode}
                        className="notis hover:text-secondary dark:hover:text-dark-accent transition-all duration-300"
                    >
                        {isDarkMode ? <FaMoon className="w-6 h-6 text-gray-200" /> : <FaSun className="w-6 h-6 text-yellow-400" />}
                    </button>

                    <Link to={`/profile/${adminId}`}>
                        <img
                            src={adminPicture}
                            alt="User"
                            className="profile w-10 h-10 rounded-full border border-gray-600"
                        />
                    </Link>
                </div>
            </div>
        </nav>
    );
}
