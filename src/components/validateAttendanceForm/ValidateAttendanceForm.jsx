import React, { useState } from 'react';
import QRCodeScannerModal from '../qrScannerModal/QRCodeScannerModal';
import ErrorModal from '../errorModal/ErrorModal';
import './ValidateAttendanceForm.css';

export default function ValidateAttendanceForm() {
    const [ticketCode, setTicketCode] = useState('');
    const [ticketInfo, setTicketInfo] = useState(null);
    const [error, setError] = useState('');
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [qrModalVisible, setQrModalVisible] = useState(false);

    const handleInputChange = (e) => {
        setTicketCode(e.target.value);
    };

    const handleValidate = async () => {
        if (!ticketCode.trim()) {
            setError('El código del boleto no puede estar vacío.');
            return;
        }

        try {
            const workgroupId = localStorage.getItem('workgroup_id'); // Obtener el workgroup_id de la sesión
            const response = await fetch(`https://recgonback-8awa0rdv.b4a.run/ticket-view-code/${ticketCode}?workgroup_id=${workgroupId}`);
            const data = await response.json();

            if (response.ok) {
                setTicketInfo(data.data);
                await validateAttendance(data.data); // Validar la asistencia después de obtener información del boleto
            } else {
                setError(data.message || 'Este boleto no existe o es inválido.');
                setTicketInfo(null);
                setModalMessage('No se encontró registro de asistencia para este boleto.');
                setErrorModalVisible(true);
            }
        } catch (error) {
            console.error('Error:', error);
            setModalMessage('Error al validar el boleto.');
            setErrorModalVisible(true);
        }
    };

    const validateAttendance = async (ticketData) => {
        try {
            const attendanceResponse = await fetch(`https://recgonback-8awa0rdv.b4a.run/attendance?ticket_code=${ticketData.code}&workgroup_id=${ticketData.workgroup_id}`);
            const attendanceData = await attendanceResponse.json();

            if (attendanceResponse.ok && attendanceData.data.length > 0) {
                const attendanceRecord = attendanceData.data[0];

                if (attendanceRecord.status === 'Sin Asistencia') {
                    // Actualizar estado a 'Ha Asistido'
                    await updateAttendance(attendanceRecord.id);
                } else {
                    setModalMessage('Este usuario ya ha sido validado.');
                    setErrorModalVisible(true);
                }
            } else {
                setModalMessage('No se encontró registro de asistencia para este boleto.');
                setErrorModalVisible(true);
            }
        } catch (error) {
            console.error('Error al validar asistencia:', error);
            setModalMessage('Error al validar la asistencia.');
            setErrorModalVisible(true);
        }
    };

    const updateAttendance = async (attendanceId) => {
        try {
            const response = await fetch(`https://recgonback-8awa0rdv.b4a.run/attendance-status/${attendanceId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status: 'Ha Asistido' }) // Solo cambiar el estado
            });
    
            if (response.ok) {
                alert('Asistencia registrada correctamente');
                // Aquí puedes reiniciar los datos del formulario si es necesario
            } else {
                setModalMessage('Error al actualizar el estado de asistencia.');
                setErrorModalVisible(true);
            }
        } catch (error) {
            console.error('Error:', error);
            setModalMessage('Error al actualizar la asistencia');
            setErrorModalVisible(true);
        }
    };
    
    return (
        <div className="custom-cs-ab validate-attendance-form p-4 bg-[#1F2937] rounded-lg shadow-md">
            <h2 className="title-uts-avs">Registrar Asistencia</h2>
            <div className="mb-4">
                <label htmlFor="ticketCode" className="block text-sm font-medium text-white">Código del Boleto</label>
                <input
                    type="text"
                    id="ticketCode"
                    value={ticketCode}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-[#4B5563] rounded-md p-2 bg-[#374151] text-white focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]"
                />
                <button 
                    type="button" 
                    onClick={() => setQrModalVisible(true)} 
                    className='bg-[#2563EB] py-1 px-2 mt-2 rounded font-medium hover:bg-[#1D4ED8]'
                >
                    Escanear por QR
                </button>
            </div>
            <button
                onClick={handleValidate}
                className="bg-[#DD8329] text-white py-2 px-4 rounded hover:bg-[#bf7021]"
            >
                Validar Boleto
            </button>

            {/* Información del ticket */}
            {ticketInfo && (
                <div className="mt-4 p-4 border rounded bg-[#374151]">
                    <h3 className="text-lg font-bold">Información del Boleto</h3>
                    <p><strong>Código:</strong> {ticketInfo.code}</p>
                    <p><strong>Nombre:</strong> {ticketInfo.ticket_name}</p>
                    <p><strong>Categoría:</strong> {ticketInfo.category_name}</p>
                    <p><strong>Costo:</strong> ${ticketInfo.category_price}</p>
                    <p><strong>Descripción:</strong> {ticketInfo.category_description}</p>
                    <p><strong>Estado:</strong> {ticketInfo.status}</p>
                </div>
            )}

            {/* Modal para mensajes de error */}
            {errorModalVisible && (
                <ErrorModal
                    message={modalMessage}
                    onClose={() => setErrorModalVisible(false)}
                />
            )}

            {/* Modal de Escaneo QR */}
            {qrModalVisible && (
                <QRCodeScannerModal
                    onClose={() => setQrModalVisible(false)}
                    onCodeDetected={setTicketCode}
                />
            )}
        </div>
    );
}
