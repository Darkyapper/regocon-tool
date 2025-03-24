import React from 'react';
import { motion } from "framer-motion";
import HeaderJustIcon from '../components/headerJustIcon/HeaderJustIcon';
import SimpleFooter from '../components/simpleFooter/SimpleFooter';
import image from '../assets/audience.png';
import regconlogo from '../assets/regcon-tool-logo-white.png';
import { useNavigate } from 'react-router-dom';
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
                    <motion.div
                        className="relative mt-[5rem] p-4 h-[350px] flex flex-col items-center justify-center bg-cover bg-center text-white"
                        style={{ backgroundImage: `url(${image})` }}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        {/* Oscurece el fondo */}
                        <div className="absolute inset-0 bg-black/70"></div>

                        {/* Contenido sobre la imagen */}
                        <div className="relative z-10 text-center">
                            <img src={regconlogo} alt="RegCon Tool" className="mx-auto w-[24rem] mb-4" />
                            <h1 className="text-3xl md:text-5xl font-bold">
                                Organiza eventos como un profesional
                            </h1>
                            <p className="text-lg md:text-2xl mt-2 opacity-90">
                                Todo lo que necesitas en un solo lugar
                            </p>
                            <div className="mt-6 md:space-x-6">
                                <button type="button" onClick={() => handleActionClick('login')} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                    Iniciar Sesión
                                </button>
                                <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-dark-text rounded-lg group border border-purple-500 dark:border-pink-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
                                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-transparent rounded-md group-hover:bg-gradient-to-br group-hover:from-purple-500 group-hover:to-pink-500">
                                        ¡Comienza Ahora!
                                    </span>
                                </button>
                            </div>

                        </div>
                    </motion.div>
                    <div className='mt-6 p-4 text-center'>
                        <h1 className='font-extrabold text-5xl text-text'>Te presentamos RegCon Tool</h1>
                        <p className='font-normal mt-4 italic'>La herramienta todo en uno para hacer de tu evento, una experiencia.</p>
                    </div>
                </div>
                <SimpleFooter />
            </div>
        </div>
    );
}
