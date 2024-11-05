import React, { useEffect, useState } from 'react';
import './WorkgroupMembersTable.css';
import { FaRegTrashAlt, FaEye } from "react-icons/fa";
import ConfirmDeleteModalU from '../confirmDeleteModalU/ConfirmDeleteModalU';
import { useNavigate } from 'react-router-dom';

export default function WorkgroupMembersTable() {
    const navigate = useNavigate();
    const [members, setMembers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [membersPerPage] = useState(15);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [memberToDelete, setMemberToDelete] = useState(null);
    const [errorMessage, setErrorMessage] = useState(''); // Estado para el mensaje de error

    useEffect(() => {
        const fetchMembers = async () => {
            const workgroupId = localStorage.getItem('workgroup_id'); // Obtén el workgroup_id

            if (!workgroupId) {
                console.error('No se encontró workgroup_id en el local storage');
                return;
            }

            try {
                const response = await fetch(`http://localhost:3000/workgroupdetails/${workgroupId}`); // Cambiar endpoint
                const data = await response.json();
                if (response.ok) {
                    setMembers(data.data); // Asegúrate de que 'data' contenga la lista de miembros
                } else {
                    console.error('Error fetching members:', data.error);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchMembers();
    }, []);

    const handleDeleteClick = (id) => {
        const roleId = localStorage.getItem('role_id'); // Obtener el role_id del localStorage

        if (roleId !== '1') { // Verificar si el rol no es igual a 1
            setErrorMessage('Solo el administrador propietario puede eliminar miembros.'); // Establecer mensaje de error
            return; // Salir de la función sin abrir el modal
        }

        setMemberToDelete(id);
        setIsModalOpen(true);
    };

    const confirmDelete = async () => {
        const workgroupId = localStorage.getItem('workgroup_id'); // Obtén el workgroup_id

        try {
            const response = await fetch(`http://localhost:3000/membership/${workgroupId}/${memberToDelete}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert('Miembro eliminado exitosamente');
                // Actualiza la lista de miembros
                setMembers(members.filter(member => member.admin_id !== memberToDelete));
            } else {
                alert('Error al eliminar el miembro');
            }
        } catch (error) {
            console.error('Error:', error);
        }
        setIsModalOpen(false);
    };

    const handleViewClick = (id) => {
        navigate(`/profile/${id}`); // Redirigir al perfil del miembro
    };

    // Paginación
    const indexOfLastMember = currentPage * membersPerPage;
    const indexOfFirstMember = indexOfLastMember - membersPerPage;
    const currentMembers = members.slice(indexOfFirstMember, indexOfLastMember);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="p-4 bg-white rounded-lg shadow-md">
            <h2 className="title-uts">Miembros del Grupo de Trabajo</h2>
            <table className="tablas-cs min-w-full border-collapse">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">Nombre</th>
                        <th className="border px-4 py-2">Apellido</th>
                        <th className="border px-4 py-2">Rol</th>
                        <th className="border px-4 py-2">Teléfono</th>
                        <th className="border px-4 py-2">Correo</th>
                        <th className="border px-4 py-2">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {currentMembers.map(member => (
                        <tr key={member.admin_id}>
                            <td className="border px-4 py-2">{member.admin_first_name}</td>
                            <td className="border px-4 py-2">{member.admin_last_name}</td>
                            <td className="border px-4 py-2">{member.role_name}</td>
                            <td className="border px-4 py-2">{member.admin_phone}</td>
                            <td className="border px-4 py-2">{member.admin_email}</td>
                            <td className="border px-4 py-2">
                                <button
                                    className="button-cs mx-1 px-4 py-2 rounded bg-teal-400 text-white hover:text-black"
                                    onClick={() => handleViewClick(member.admin_id)} // Cambiar a la función de ver perfil
                                >
                                    <FaEye />
                                </button>
                                <button
                                    className="button-cs mx-1 px-4 py-2 rounded bg-red-600 text-white hover:text-black"
                                    onClick={() => handleDeleteClick(member.admin_id)}
                                >
                                    <FaRegTrashAlt />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Paginación */}
            <div className="flex justify-center mt-4">
                {[...Array(Math.ceil(members.length / membersPerPage))].map((_, index) => (
                    <button
                        key={index}
                        onClick={() => paginate(index + 1)}
                        className={`button-cs mx-1 px-4 py-2 rounded ${currentPage === index + 1 ? 'bg-teal-400 text-white' : 'bg-gray-200'}`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>

            {/* Modal de confirmación */}
            <ConfirmDeleteModalU
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={confirmDelete}
            />
            {/* Mensaje de error */}
            {errorMessage && (
                <div className="mt-4 p-4 border rounded bg-red-100">
                    <p className="text-red-500">{errorMessage}</p>
                </div>
            )}
        </div>
    );
}
