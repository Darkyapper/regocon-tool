import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IoArrowBackOutline } from "react-icons/io5";
import './EditTCForm.css';
import ConfirmDiscardChangesModal from '../confirmDiscardChangesModal/ConfirmDiscardChangesModal';

export default function EditTCForm() {
    const { id } = useParams(); // Obtiene el ID de la categoría desde la URL
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
    });
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFormDirty, setIsFormDirty] = useState(false); // Para rastrear si el formulario ha sido modificado

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await fetch(`https://recgonback-8awa0rdv.b4a.run/ticket-categories/${id}`);
                const data = await response.json();
                if (response.ok) {
                    setFormData(data.data); // Cargar datos de la categoría
                } else {
                    alert(data.error || 'Error al obtener los datos de la categoría');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchCategory();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setIsFormDirty(true); // Marcar el formulario como sucio
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://recgonback-8awa0rdv.b4a.run/ticket-categories/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (response.ok) {
                alert('Categoría de boletos actualizada exitosamente');
                navigate('/ticket-categories');
            } else {
                alert(data.error || 'Error al actualizar la categoría');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleBackClick = () => {
        if (isFormDirty) {
            setIsModalOpen(true); // Mostrar el modal de confirmación
        } else {
            navigate('/ticket-categories'); // Navegar de vuelta sin aviso
        }
    };

    const confirmDiscardChanges = () => {
        setIsModalOpen(false);
        navigate('/ticket-categories'); // Navegar de vuelta descartando cambios
    };

    return (
        <div className="register-user-form-tcf p-4 bg-[#1F2937] rounded-lg shadow-md">
            <div className="edit-div-cs flex flex-row items-center">
                <button className="button-cs mx-1 px-3 py-2 rounded bg-orange-500 text-white hover:text-black" onClick={handleBackClick}>
                    <IoArrowBackOutline />
                </button>
                <h2 className="title-uts-tcfe">Editar Categoría de Boletos</h2>
            </div>
            <form className='bg-[#374151]' onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-white">Nombre de la categoría</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border rounded-md p-2"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="price" className="block text-sm font-medium text-white">Costo</label>
                    <input
                        type="number" // Cambiado a type="number" para asegurar que sea un número
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border rounded-md p-2"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium text-white">Descripción breve de la categoría</label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border rounded-md p-2"
                    />
                </div>
                <button
                    type="submit"
                    className="submit-custom bg-[#DD8329] text-white py-2 px-4 rounded hover:bg-[#bf7021]"
                >
                    Guardar Cambios
                </button>
            </form>

            {/* Modal de confirmación de cambios no guardados */}
            <ConfirmDiscardChangesModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onConfirm={confirmDiscardChanges}
            />
        </div>
    );
}
