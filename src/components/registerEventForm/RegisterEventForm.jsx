import React, { useEffect, useState } from 'react';
import './RegisterEventForm.css';
const apiUrl = import.meta.env.VITE_API_BASE_URL;

export default function RegisterEventForm() {
    const [formData, setFormData] = useState({
        name: '',
        event_date: '',
        location: '',
        description: '',
        workgroup_id: '',
        image: '',
        event_category_id: '',
        is_online: false
    });

    const [eventCategories, setEventCategories] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar el modal
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false); // Modal de éxito

    useEffect(() => {
        const fetchEventCategories = async () => {
            try {
                const response = await fetch(`${apiUrl}/event-categories`);
                const data = await response.json();
                if (response.ok) {
                    setEventCategories(data.data); // Guardar todas las categorías
                } else {
                    alert(data.error || 'Error al obtener categorías de eventos');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchEventCategories();

        const workgroupId = localStorage.getItem('workgroup_id');
        setFormData(prevState => ({
            ...prevState,
            workgroup_id: workgroupId
        }));
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${apiUrl}/events`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...formData,
                    event_category: formData.event_category_id // Se pasa el id de la categoría seleccionada
                })
            });
            const data = await response.json();
            if (response.ok) {
                // Show success modal
                setIsSuccessModalOpen(true);
                // Clear form after successful creation
                setFormData({
                    name: '',
                    event_date: '',
                    location: '',
                    description: '',
                    workgroup_id: '',
                    image: '',
                    event_category_id: '',
                    is_online: false
                });
            } else {
                alert(data.error || 'Error al crear el evento');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const selectEventCategory = (category) => {
        setFormData(prevState => ({
            ...prevState,
            event_category_id: category.id
        }));
        closeModal();
    };

    return (
        <div className="register-event-form  p-6 bg-cards dark:bg-dark-cards text-text dark:text-dark-text rounded-lg shadow-md">
            <h2 className="text-[2.5rem] poppins-font font-regular mb-4">Crear un Evento Nuevo</h2>
            <form className="noto-font poppins-font bg-select dark:bg-dark-select text-base font-regular dark:text-dark-text text-text p-6 rounded-lg" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="poppins-font block text-base font-regular dark:text-dark-text text-text">Nombre del evento</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="mt-2 block w-full px-3 py-2 bg-background dark:bg-dark-background rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-primary"
                    />
                </div>
                <div className="mb-4 relative">
                    <label htmlFor="event_date" className="block text-base font-regular dark:text-dark-text text-text">
                        Fecha del evento
                    </label>
                    <input
                        type="date"
                        id="event_date"
                        name="event_date"
                        value={formData.event_date}
                        onChange={handleChange}
                        required
                        className="mt-2 block w-full px-3 py-2 bg-background dark:bg-dark-background rounded-md focus:outline-none focus:ring-2 focus:ring-primary appearance-none 
            text-text dark:text-dark-text
            [&::-webkit-calendar-picker-indicator]:opacity-0"
                    />
                    <div className="absolute right-3 top-9 mt-[0.4rem] pointer-events-none">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5 text-text dark:text-dark-text"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M6 2a1 1 0 012 0v1h4V2a1 1 0 112 0v1h3a1 1 0 011 1v14a1 1 0 01-1 1H3a1 1 0 01-1-1V4a1 1 0 011-1h3V2zm-2 6v9h12V8H4z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                </div>

                <div className="mb-4">
                    <label htmlFor="location" className=" block text-base font-regular dark:text-dark-text text-text">Ubicación</label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                        className="mt-2 block w-full px-3 py-2 bg-background dark:bg-dark-background rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className=" block text-base font-regular dark:text-dark-text text-text">Descripción corta del evento</label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="mt-2 block w-full px-3 py-2 bg-background dark:bg-dark-background rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="event_category_id" className=" block text-base font-regular dark:text-dark-text text-text">Categoría del Evento</label>
                    <button
                        type="button"
                        onClick={openModal}
                        className="mt-2 block w-full px-3 py-2 bg-white text-black rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                        {formData.event_category_id
                            ? eventCategories.find(cat => cat.id === formData.event_category_id)?.name
                            : 'Seleccione una categoría de evento'}
                    </button>
                </div>
                <div className="mb-4">
                    <label className=" block text-base font-regular dark:text-dark-text text-text mb-2">¿Es en línea?</label>
                    <div className="flex items-center space-x-4">
                        <input
                            type="checkbox"
                            id="is_online"
                            name="is_online"
                            checked={formData.is_online}
                            onChange={handleChange}
                            className="w-5 h-5 text-primary dark:text-dark-primary border-gray-600 rounded focus:ring-2 focus:ring-primary"
                        />
                        <div className="text-gray-300 text-sm">
                            <span className='text-text dark:text-dark-text'>Marque esta casilla si su evento se realizará de forma virtual.</span>
                        </div>
                    </div>
                </div>
                <button
                    type="submit"
                    className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-accent focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                    Crear Evento
                </button>
            </form>

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
                        <h2 className="text-lg font-bold mb-4">¡Evento creado exitosamente!</h2>
                        <p className="text-sm mb-4">El evento se ha creado correctamente. Puedes ver los detalles en tu página de eventos.</p>
                        <button
                            onClick={() => setIsSuccessModalOpen(false)}
                            className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}

            {/* Modal para seleccionar categorías de eventos */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
                    onClick={closeModal}
                >
                    <div
                        className="bg-background dark:bg-dark-cards p-6 rounded-lg w-1/3 max-h-[80vh] text-text dark:text-dark-text overflow-y-auto relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={closeModal}
                            className="absolute top-2 right-2 text-text dark:text-dark-text bg-cards hover:bg-select dark:bg-dark-background dark:hover:bg-gray-800 rounded-full w-8 h-8 flex items-center justify-center"
                        >
                            &times;
                        </button>
                        <h2 className="text-lg font-bold mb-4">Seleccione una categoría de evento</h2>
                        <ul>
                            {eventCategories.map((category) => (
                                <li
                                    key={category.id}
                                    onClick={() => selectEventCategory(category)}
                                    className="p-2 hover:bg-select dark:hover:bg-dark-select cursor-pointer"
                                >
                                    {category.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}
