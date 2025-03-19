import React, { useEffect, useState } from 'react';
const apiUrl = import.meta.env.VITE_API_BASE_URL;
import { BsQrCodeScan } from "react-icons/bs";
import { HiMiniPencilSquare } from "react-icons/hi2";
import { IoTicketOutline } from "react-icons/io5";

export default function TicketOMode() {

    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false); // Modal de éxito
    const [isSellModalOpen, setIsSellModalOpen] = useState(false); // Modal de venta de boletos
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [ticketInfo, setTicketInfo] = useState(null);
    const [loading, setLoading] = useState(false);

    const workgroupId = localStorage.getItem("workgroup_id");
    const token = localStorage.getItem("authToken");

    useEffect(() => {
        if (isSellModalOpen) {
            fetchEvents();
        }
    }, [isSellModalOpen]);

    const fetchEvents = async () => {
        try {
            const response = await fetch(`${apiUrl}/my-active-events?workgroup_id=${workgroupId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await response.json();
            if (data.message === "Success") {
                setEvents(data.data);
            }
        } catch (error) {
            console.error("Error fetching events:", error);
        }
    };

    const handleEventSelection = async (eventId) => {
        setSelectedEvent(eventId);
        setLoading(true);
        try {
            const ticketResponse = await fetch(`${apiUrl}/ticket-events/${eventId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const ticketData = await ticketResponse.json();
            if (ticketData.message === "Boletos relacionados con el evento encontrados") {
                const ticketCategoryId = ticketData.data[0]?.ticketcategory_id;
                if (ticketCategoryId) {
                    fetchTicketInfo(ticketCategoryId);
                }
            }
        } catch (error) {
            console.error("Error fetching tickets:", error);
        }
    };

    const fetchTicketInfo = async (ticketCategoryId) => {
        try {
            const response = await fetch(`${apiUrl}/ticket-categories-with-counts/${ticketCategoryId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await response.json();
            if (data.message === "Success") {
                setTicketInfo(data.data);
            }
        } catch (error) {
            console.error("Error fetching ticket info:", error);
        } finally {
            setLoading(false);
        }
    };

    const openSellModal = () => {
        setIsSellModalOpen(true);
    }

    const closeSellModal = () => {
        setIsSellModalOpen(false);
    }

    return (
        <div className="register-event-form poppins-font  p-6 bg-cards dark:bg-dark-cards text-text dark:text-dark-text rounded-lg shadow-md">
            <h2 className="text-[2.5rem] poppins-font font-regular">Modo de Taquilla</h2>
            <p className='text-text dark:text-dark-text mb-4'>¡Bienvenido al modo de taquilla! En este modo podrá cobrar boletos de manera fisica y validar los boletos de sus asistentes. Para llevar una flujo más rápido, le recomendamos que mire nuestro <a href="#"><span className='font-bold hover:underline text-text dark:text-dark-text'>Manual de Eventos</span></a></p>
            <div className="flex flex-col md:flex-row gap-4 space-between items-center w-full">
                <div className='bg-select dark:bg-dark-select p-4 rounded-lg shadow-md w-full'>
                    <h1 className='font-extrabold text-xl mb-4'>Registrar Entrada</h1>
                    <div className='flex flex-col gap-4'>
                        <button className='transition-transform transform hover:scale-105 duration-300 ease-in-out font-medium bg-primary dark:bg-dark-primary p-2 rounded-lg shadow-md text-white text-center flex items-center justify-center'>
                            <BsQrCodeScan className='text-center mr-4' size={24} /> {/* Ajusta el tamaño del ícono */}
                            Escanear QR
                        </button>
                        <button className='transition-transform transform hover:scale-105 duration-300 ease-in-out font-medium bg-primary dark:bg-dark-primary p-2 rounded-lg shadow-md text-white text-center flex items-center justify-center'>
                            <HiMiniPencilSquare className='text-center mr-4' size={24} /> {/* Ajusta el tamaño del ícono */}
                            Registrar Manual
                        </button>
                    </div>
                </div>
                <div className='bg-select dark:bg-dark-select p-4 rounded-lg shadow-md w-full'>
                    <h1 className='font-extrabold text-xl mb-4'>Venta de Boletos</h1>
                    <button onClick={() => setIsSellModalOpen(true)} className='w-full transition-transform transform hover:scale-105 duration-300 ease-in-out font-medium bg-primary dark:bg-dark-primary p-2 rounded-lg shadow-md text-white text-center flex items-center justify-center'>
                        <IoTicketOutline className='text-center mr-4' size={24} /> {/* Ajusta el tamaño del ícono */}
                        Vender Boleto
                    </button>
                </div>
            </div>
            {/* Modal de éxito */}
            {isSuccessModalOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
                    onClick={() => setIsSuccessModalOpen(false)}
                >
                    <div
                        className="bg-white p-6 rounded-lg w-1/3 text-black"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setIsSuccessModalOpen(false)}
                            className="absolute top-2 right-2 text-black bg-gray-200 hover:bg-gray-300 rounded-full w-8 h-8 flex items-center justify-center"
                        >
                            &times;
                        </button>
                        <h2 className="text-lg font-bold mb-4">¡Éxito!</h2>
                        <p className="text-sm mb-4">Modal de éxito.</p>
                        <button
                            onClick={() => setIsSuccessModalOpen(false)}
                            className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-accent focus:outline-none focus:ring-2 focus:ring-secondary"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}

            {/* Modal de venta */}
            {isSellModalOpen && (
                <div className="fixed poppins-font inset-0 bg-black bg-opacity-50 flex items-center justify-center" onClick={() => setIsSellModalOpen(false)}>
                    <div className="bg-white p-6 rounded-lg w-1/3 text-black" onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => setIsSellModalOpen(false)} className="absolute top-2 right-2 bg-gray-200 hover:bg-gray-300 rounded-full w-8 h-8 flex items-center justify-center">
                            &times;
                        </button>
                        <h2 className="text-2xl font-bold mb-2"><div className='flex items-center justify-center'><IoTicketOutline className='mr-2'/>Venta de boletos</div></h2>

                        {/* Selector de eventos */}
                        <label className="block mb-2 text-sm font-semibold">Seleccione un evento:</label>
                        <select
                            onChange={(e) => handleEventSelection(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md mb-4"
                        >
                            <option value="">Seleccione un evento</option>
                            {events.map((event) => (
                                <option key={event.event_id} value={event.event_id}>
                                    {event.event_name}
                                </option>
                            ))}
                        </select>

                        {/* Mostrar info de boletos */}
                        {loading &&
                            <div className='text-center'>
                                <div role="status">
                                    <svg aria-hidden="true" class="inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                    </svg>
                                    <span class="sr-only">Cargando boletos, espere...</span>
                                </div>
                            </div>}
                        {ticketInfo && (
                            <div className="mt-2">
                                <div className='mb-4'>
                                    <h3 className="text-lg font-semibold">{ticketInfo.name}</h3>
                                    <p>
                                        <strong>Precio:</strong> ${ticketInfo.price}
                                    </p>
                                    <p>
                                        <strong>Disponibles:</strong> {ticketInfo.available_tickets}
                                    </p>
                                </div>


                                {/* Botón de compra */}
                                {ticketInfo.available_tickets > 0 ? (
                                    <button className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-accent">
                                        Confirmar Selección
                                    </button>
                                ) : (
                                    <p className="text-red-500 font-bold mt-2">No hay boletos disponibles.</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}

        </div>
    );
}
