import React, { useEffect, useState } from 'react';
import './DashboardAHome.css';
import { FiFilePlus, FiCheckCircle } from "react-icons/fi";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { BsFillCalendar2PlusFill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
const apiUrl = import.meta.env.VITE_API_BASE_URL;

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
        else if (action === 'Comprar Creditos') {
            navigate('/credits/buy');
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

    const [workgroupData, setWorkgroupData] = useState(null);

    useEffect(() => {
        const fetchWorkgroupData = async () => {
            const workgroupId = localStorage.getItem('workgroup_id');

            if (!workgroupId) {
                console.error('No se encontró workgroup_id en el local storage');
                return;
            }

            try {
                const response = await fetch(`${apiUrl}/workgroups/${workgroupId}`);
                const data = await response.json();
                console.log(data);
                if (response.ok) {
                    setWorkgroupData(data.data); // Almacena toda la información del workgroup
                } else {
                    console.error('Error al obtener datos del workgroup:', data.error);
                }
            } catch (error) {
                console.error('Error de red:', error);
            }
        };

        fetchWorkgroupData();
    }, []);

    return (
        <div className="custom-content p-4">
            <h1 className="text-text dark:text-dark-text text-3xl poppins-font font-bold mb-1">{getGreeting()}</h1>
            {workgroupData && (
                <div className="mb-6">
                    <p className='text-text dark:text-dark-text text-[1rem] poppins-font font-light mb-4'>Espacio de trabajo de {workgroupData.name}</p>
                    <h2 className="text-lg mb-2 text-text dark:text-dark-text noto-font">Información General</h2>
                    <div className='columns-2'>
                        <div className="bg-primary dark:bg-dark-primary mb-2 p-4 rounded-lg shadow-md text-white poppins-font">
                            <h3 className="text-xl font-semibold">Total de Ganancias</h3>
                            <p className="text-2xl">${workgroupData.gains}</p>
                        </div>
                        <div className="bg-accent dark:bg-dark-accent p-4 rounded-lg shadow-md text-white poppins-font">
                            <h3 className="text-xl font-semibold">Créditos Disponibles</h3>
                            <p className="text-2xl">{workgroupData.credits_balance}</p>
                        </div>
                        <button className='text-sm bg-primary dark:bg-dark-primary hover:bg-accent dark:hover:bg-dark-accent p-2 rounded-lg shadow-md text-white poppins-font'
                            onClick={() => handleActionClick('Comprar Creditos')}
                        >
                            Adquirir Créditos
                        </button>
                    </div>
                </div>
            )}

            <h2 className="text-lg mb-2 text-text dark:text-dark-text noto-font">Acciones Rápidas</h2>
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
