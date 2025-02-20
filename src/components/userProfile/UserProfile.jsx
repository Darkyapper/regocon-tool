import React, { useEffect, useState } from 'react';

const apiUrl = import.meta.env.VITE_API_BASE_URL;

export default function UserProfile({ id }) {
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchUserProfile();
    }, [id]);

    const fetchUserProfile = async () => {
        try {
            const response = await fetch(`${apiUrl}/admin/${id}`, {
                method: 'GET',
                credentials: 'include', // Enviar cookies en la solicitud
            });

            const data = await response.json();
            if (response.ok) {
                setUser(data.data);
            } else {
                setError(data.message || 'Error al obtener el perfil del usuario');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Error al obtener el perfil del usuario');
        }
    };

    return (
        <div className='custom-xuxu text-white'>
            {error && <p className="text-red-500">{error}</p>}
            {user ? (
                <div className='profile-container'>
                    <h2 className="title text-2xl font-bold">Perfil de Administrador</h2>
                    <div className="bg-[#1F2937] profile-info mt-4 flex items-center">
                        <img src={user.picture || 'default-avatar.png'} alt="Foto de perfil" className="rounded-full w-32 h-32 mr-4" />
                        <div className="user-details">
                            <p><strong>Nombre:</strong> {user.first_name} {user.last_name}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>Teléfono:</strong> {user.phone}</p>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Cargando información del administrador...</p>
            )}
        </div>
    );
}
