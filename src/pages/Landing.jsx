import React from 'react';
import { motion } from "framer-motion";
import HeaderJustIcon from '../components/headerJustIcon/HeaderJustIcon';
import SimpleFooter from '../components/simpleFooter/SimpleFooter';
import image from '../assets/audience.png';
import regconlogo from '../assets/regcon-tool-logo-white.png';
import { useNavigate } from 'react-router-dom';
import { FaClipboardList } from "react-icons/fa";
import regconMockup from '../assets/regcon-pc-mockup-1.png';
import { FaChartSimple } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";
import { FaCreditCard } from "react-icons/fa";
const apiUrl = import.meta.env.VITE_API_BASE_URL;

export default function Landing() {
    const navigate = useNavigate();

    const handleActionClick = (action) => {
        if (action === 'login') {
            navigate('/login');
        }
        else if (action === '¡Comienza Ahora!') {
            navigate('/new-z-account');
        }
        console.log(`Action clicked: ${action}`);
    }

    return (
        <div>
            <div className="flex flex-col min-h-screen">
                <HeaderJustIcon />
                <div className="flex-grow">
                    <div className='h-[4.6rem]'>
                    </div>
                    <motion.div
                        className="relative p-4 h-[400px] flex flex-col items-center justify-center bg-cover bg-center text-white"
                        style={{ backgroundImage: `url(${image})` }}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        {/* Oscurece el fondo */}
                        <div className="absolute inset-0 bg-black/70"></div>

                        {/* Contenido sobre la imagen */}
                        <div className="relative z-10 text-center">
                            <img src={regconlogo} alt="RegCon Tool" className="mx-auto w-80 md:w-[24rem] mb-4" />
                            <h1 className="text-3xl md:text-5xl font-bold text-2xl sm:mt-2">
                                Gestiona eventos como un profesional
                            </h1>
                            <p className="text-lg md:text-2xl mt-2 opacity-90 text-lg ">
                                Todo lo que necesitas en un solo lugar
                            </p>
                            <div className="mt-6 flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-6 justify-center items-center">
                                <button
                                    type="button"
                                    onClick={() => handleActionClick('login')}
                                    className="w-full max-w-xs md:w-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center justify-center dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                >
                                    Iniciar Sesión
                                </button>
                                <button
                                    className="w-full max-w-xs md:w-auto relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-dark-text rounded-lg group border border-purple-500 dark:border-pink-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
                                >
                                    <span className="w-full text-center px-5 py-2.5 transition-all ease-in duration-75 bg-transparent rounded-md flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-purple-500 group-hover:to-pink-500">
                                        ¡Comienza Ahora!
                                    </span>
                                </button>
                            </div>


                        </div>
                    </motion.div>
                    <div className='p-4'>
                        <div className='mt-6 text-center'>
                            <h1 className='font-extrabold text-3xl md:text-5xl text-text'>Te presentamos RegCon Tool</h1>
                            <p className='font-normal md:text-base text-sm md:mt-4 italic'>La herramienta todo en uno para hacer de tu evento una experiencia única.</p>
                        </div>
                        <div className='flex flex-col md:flex-row md:mt-6 p-6'>
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                            >
                                <div className='md:mr-6'>
                                    <img src={regconMockup} alt="RegCon Tool" className='w-90 md:w-[40rem] rounded-xl' />
                                </div>
                            </motion.div>
                            <div className='mt-6 md:mt-0 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 md:flex-1 cursor-default'>
                                <div className='flex flex-col bg-primary p-4 rounded-xl text-dark-text shadow-lg justify-center items-center transition duration-300 ease-in-out hover:transform hover:scale-105 cursor-pointer'>
                                    <FaClipboardList className='text-4xl' />
                                    <h3 className='text-center'>Registro y Control de Asistentes</h3>
                                </div>
                                <div className='flex flex-col bg-primary p-4 rounded-xl text-dark-text shadow-lg justify-center items-center transition duration-300 ease-in-out hover:transform hover:scale-105 cursor-pointer'>
                                    <FaChartSimple className='text-4xl' />
                                    <h3 className='text-center'>Analisis de Datos en Tiempo Real</h3>
                                </div>
                                <div className='flex flex-col bg-primary p-4 rounded-xl text-dark-text shadow-lg justify-center items-center transition duration-300 ease-in-out hover:transform hover:scale-105 cursor-pointer'>
                                    <FaCalendarAlt className='text-4xl' />
                                    <h3 className='text-center'>Gestión de Agenda y Logística</h3>
                                </div>
                                <div className='flex flex-col bg-primary p-4 rounded-xl text-dark-text shadow-lg justify-center items-center transition duration-300 ease-in-out hover:transform hover:scale-105 cursor-pointer'>
                                    <FaCreditCard className='text-4xl' />
                                    <h3 className='text-center'>Pago y Facturación Integrada</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <SimpleFooter />
            </div>
        </div>
    );
}
