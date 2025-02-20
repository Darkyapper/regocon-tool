import React from 'react';
import './DashboardAHome.css';
import { FiFilePlus, FiCheckCircle } from "react-icons/fi";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { BsFillCalendar2PlusFill } from "react-icons/bs"; 
import { useNavigate } from 'react-router-dom';

export default function DashboardAHome() {
    
    const navigate = useNavigate();

    const handleActionClick = (action) => {
        if (action === 'Pagina') {
            navigate('/events/page');
        }
        else if (action === 'Validar Asistencia') {
            navigate('/attendance-validation');
        }
        else if (action === 'Crear Evento') {
            navigate('/events/add');
        }
        console.log(`Action clicked: ${action}`);
    };

    const currentHour = new Date().getHours();

    const getGreeting = () => {
        if (currentHour < 12) {
            return "¡Bienvenido, buenos días!";
        } else if (currentHour < 18) {
            return "¡Bienvendo, buenas tardes!";
        } else {
            return "¡Bienvenido, buenas noches!";
        }
    };

    return (
        <div className="custom-content p-4">
            <h1 className="text-text dark:text-dark-text text-3xl poppins-font font-bold mb-4">{getGreeting()}</h1>
            <h2 className="text-lg mb-4 text-text dark:text-dark-text noto-font">Acciones Rápidas</h2>
            <div className="grid grid-cols-3 gap-4 poppins-font">
                <div
                    className="group transition-transform transform hover:scale-105 duration-300 ease-in-out font-medium bg-primary dark:bg-dark-primary p-4 rounded-lg shadow-md text-white text-center cursor-pointer"
                    onClick={() => handleActionClick('Crear Evento')}
                >
                    <h3 className="button-t-c">Crear Nuevo Evento</h3>
                    <div className="flex justify-center items-center">
                        <BsFillCalendar2PlusFill className="icon-custom w-16 h-16" />
                    </div>
                </div>

                <div
                    className="group transition-transform transform hover:scale-105 duration-300 ease-in-out font-medium bg-primary dark:bg-dark-primary p-4 rounded-lg shadow-md text-white text-center cursor-pointer"
                    onClick={() => handleActionClick('Validar Asistencia')}
                >
                    <h3 className="button-t-c">Validar Asistencia</h3>
                    <div className="flex justify-center items-center">
                        <FiCheckCircle className="icon-custom w-16 h-16" />
                    </div>
                </div>
                <div
                    className="group transition-transform transform hover:scale-105 duration-300 ease-in-out font-medium bg-primary dark:bg-dark-primary p-4 rounded-lg shadow-md text-white text-center cursor-pointer"
                    onClick={() => handleActionClick('Pagina')}
                >
                    <h3 className="button-t-c">Editar Página</h3>
                    <div className="flex justify-center items-center">
                        <HiOutlinePencilSquare className="icon-custom w-16 h-16" />
                    </div>
                </div>
            </div>
        </div>
    );
}
