import React, { useState } from 'react';
import './RegisterUserForm.css';

export default function RegisterUserForm() {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch('https://recgonback-8awa0rdv.b4a.run/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData) // Envía los datos sin la contraseña
            });
            const data = await response.json();
            if (response.ok) {
                alert(`Usuario registrado exitosamente. La contraseña temporal es: ${data.message.split(': ')[1]}`); // Muestra la contraseña temporal que devuelve el servidor
                setFormData({ first_name: '', last_name: '', email: '', phone: '' }); // Reset form
            } else {
                alert(data.error || 'Error al registrar el usuario');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    return (
        <div className="register-user-form p-4 bg-[#1F2937] rounded-lg shadow-md">
            <h2 className="custom-wawa-uss text-lg mb-4">Registrar Nuevo Usuario</h2>
            <form className="bg-[#374151]" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="first_name" className="block text-sm font-medium text-white">Nombre</label>
                    <input
                        type="text"
                        id="first_name"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border rounded-md p-2"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="last_name" className="block text-sm font-medium text-white">Apellido</label>
                    <input
                        type="text"
                        id="last_name"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border rounded-md p-2"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-white">Correo Electrónico</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border rounded-md p-2"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="phone" className="block text-sm font-medium text-white">Número de Teléfono</label>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="mt-1 block w-full border rounded-md p-2"
                    />
                </div>
                <button
                    type="submit"
                    className="sumbit-custom bg-[#DD8329] text-white py-2 px-4 rounded hover:bg-[#bf7021]"
                >
                    Registrar
                </button>
            </form>
        </div>
    );
}
