import React, { useState } from 'react';
import './LoginForm.css';
import { useNavigate } from 'react-router-dom';
const apiUrl = import.meta.env.VITE_API_BASE_URL;

export default function LoginForm() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Estado para manejar la carga

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true); // Activa el indicador de carga
        setError(''); // Limpia cualquier error previo
        try {
            const response = await fetch(`${apiUrl}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('workgroup_id', data.workgroup_id);
                localStorage.setItem('user_id', data.user_id);
                localStorage.setItem('role_id', data.role_id);
                navigate('/dashboard');
            } else {
                setError(data.error);
            }
        } catch (error) {
            console.error('Error en la solicitud de inicio de sesión:', error);
            setError('Error al intentar iniciar sesión.');
        } finally {
            setIsLoading(false); // Desactiva el indicador de carga
        }
    };

    return (
        <div className={`main-container ${isLoading ? 'cursor-wait' : ''}`}>
            <div className='custom-form'>
                <form
                    className={`max-w-sm mx-auto ${isLoading ? 'cursor-wait' : ''}`}
                    onSubmit={handleSubmit}
                >
                    <div className="info-form">
                        <h1 className='title-form'>Iniciar Sesión</h1>
                        <p className='description-form'>
                            Ingrese los datos con los que se registró en RegCon™ o los proporcionados por su administrador.
                        </p>
                    </div>
                    {error && <p className="text-red-500">{error}</p>}
                    <div className="mb-5">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">Correo</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="admin@mymail.com"
                            required
                            disabled={isLoading} // Desactiva el input mientras carga
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="border rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            required
                            disabled={isLoading} // Desactiva el input mientras carga
                        />
                    </div>
                    <div className='button-to-access'>
                        <button
                            type="submit"
                            className={`text-white bg-[#DD8329] hover:bg-[#bf7021] focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ${
                                isLoading ? 'cursor-wait opacity-50' : ''
                            }`}
                            disabled={isLoading} // Desactiva el botón mientras carga
                        >
                            {isLoading ? 'Iniciando Sesión...' : 'Acceder'}
                        </button>
                    </div>
                    <p className='pics-as mt-2'>¿No tienes una cuenta? <a className="just-it-a" href="">Regístrate aquí</a></p>
                </form>
            </div>
        </div>
    );
}
