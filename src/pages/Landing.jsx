import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { motion, useInView } from "framer-motion";
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
import eventBg from '../assets/event-1.png';
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

    const ref = useRef(null);

    // 2. Usa el hook useInView para detectar cuando el elemento es visible
    const isInView = useInView(ref, {
        once: true, // Opcional: para que solo se anime una vez
        margin: "-100px", // Ajusta cuándo se activa (100px antes de entrar completamente)
    });

    // 1. Añade estado para controlar la carga del video
    const [videoLoaded, setVideoLoaded] = useState(false);
    const videoRef = useRef(null);

    // 2. Efecto para Intersection Observer
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !videoLoaded) {
                    setVideoLoaded(true);
                }
            },
            {
                threshold: 0.1,
                rootMargin: '200px'
            }
        );

        if (videoRef.current) {
            observer.observe(videoRef.current);
        }

        return () => {
            if (videoRef.current) {
                observer.unobserve(videoRef.current);
            }
        };
    }, [videoLoaded]);

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
                        <div className="absolute inset-0 bg-black/60"></div>

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
                                    className="transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 w-full max-w-xs md:w-auto text-white bg-blue-700 hover:bg-blue-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center justify-center dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 hover:shadow-[0_0_10px_2px_rgba(95,194,252,0.8)]"
                                >
                                    Iniciar Sesión
                                </button>
                                <button
                                    className="transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 w-full max-w-xs md:w-auto relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-dark-text rounded-lg group border border-purple-500 dark:border-pink-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 hover:shadow-[0_0_10px_2px_rgba(168,85,247,0.8)]"
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
                                    <h3 className='text-center mt-2'>Registro y Control de Asistentes</h3>
                                </div>
                                <div className='flex flex-col bg-primary p-4 rounded-xl text-dark-text shadow-lg justify-center items-center transition duration-300 ease-in-out hover:transform hover:scale-105 cursor-pointer'>
                                    <FaChartSimple className='text-4xl' />
                                    <h3 className='text-center mt-2'>Analisis de Datos en Tiempo Real</h3>
                                </div>
                                <div className='flex flex-col bg-primary p-4 rounded-xl text-dark-text shadow-lg justify-center items-center transition duration-300 ease-in-out hover:transform hover:scale-105 cursor-pointer'>
                                    <FaCalendarAlt className='text-4xl' />
                                    <h3 className='text-center mt-2'>Gestión de Agenda y Logística</h3>
                                </div>
                                <div className='flex flex-col bg-primary p-4 rounded-xl text-dark-text shadow-lg justify-center items-center transition duration-300 ease-in-out hover:transform hover:scale-105 cursor-pointer'>
                                    <FaCreditCard className='text-4xl' />
                                    <h3 className='text-center mt-2'>Pago y Facturación Integrada</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='p-4 justify-center items-center flex flex-col bg-cards shadow-lg'>
                        <div
                            ref={videoRef}
                            className="relative w-full max-w-4xl h-full md:h-[30rem]"
                        >
                            {videoLoaded ? (
                                // Iframe de YouTube (solo se carga cuando está en viewport)
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src="https://www.youtube.com/embed/n8ifDfjzEN4?autoplay=0&rel=0"
                                    title="Video demostrativo RegCon"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="rounded-2xl shadow-xl"
                                />
                            ) : (
                                // Placeholder (thumbnail + botón de play)
                                <div
                                    className="w-full h-full bg-cover bg-center flex items-center justify-center cursor-pointer"
                                    style={{
                                        backgroundImage: 'url(https://img.youtube.com/vi/n8ifDfjzEN4/maxresdefault.jpg)',
                                        borderRadius: '0.5rem'
                                    }}
                                    onClick={() => setVideoLoaded(true)}
                                >
                                    <div className="absolute inset-0 bg-black/30 hover:bg-black/20 transition-all"></div>
                                    <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center z-10 hover:scale-110 transition-transform">
                                        <svg className="w-12 h-12 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M6.3 2.8L17 10 6.3 17.2V2.8z" />
                                        </svg>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <motion.div
                        ref={ref} // 3. Asigna la referencia
                        className="relative p-4 h-[400px] flex md:mt-6 flex-col items-center bg-cover bg-center text-white"
                        style={{ backgroundImage: `url(${eventBg})` }}
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }} // 4. Controla la animación
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <div className="absolute inset-0 bg-black/80"></div>

                        <div className="relative z-10 text-center p-6">
                            <h1 className='font-extrabold text-3xl md:text-5xl text-dark-text'>
                                Descubre cómo funciona
                            </h1>
                            <p className='font-normal md:text-base text-sm md:mt-2 italic'>
                                RegCon Tool simplifica la gestión de eventos y te permite enfocarte en lo que realmente importa en pocos pasos.
                            </p>
                        </div>
                    </motion.div>
                </div>
                <SimpleFooter />
            </div>
        </div>
    );
}
