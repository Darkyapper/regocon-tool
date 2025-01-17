import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import './CreateReportForm.css';
import image from '../../assets/document.png';

export default function CreateReportForm() {
    const [author, setAuthor] = useState('');
    const [logo, setLogo] = useState(null);
    const [printDate, setPrintDate] = useState('');
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    const handleLogoChange = (e) => {
        setLogo(e.target.files[0]);
    };

    useEffect(() => {
        const fetchUsers = async () => {
            const workgroupId = localStorage.getItem('workgroup_id'); // Obtén el workgroup_id

            if (!workgroupId) {
                console.error('No se encontró workgroup_id en el local storage');
                return;
            }

            try {
                const response = await fetch(`https://recgonback-8awa0rdv.b4a.run/usersmembership?workgroup_id=${workgroupId}`); // Llama al endpoint con el workgroup_id
                const data = await response.json();
                if (response.ok) {
                    setUsers(data.data); // Suponiendo que 'data' contiene la lista de usuarios
                } else {
                    alert(data.error || 'Error al obtener usuarios');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchUsers();
    }, []);

    const handleSaveAsPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(20);
        doc.text('Informe de Usuarios', 20, 20);
        doc.setFontSize(12);
        doc.text(`Autor: ${author}`, 20, 30);
        doc.text(`Fecha de Impresión: ${printDate}`, 20, 40);

        if (logo) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const imgData = reader.result;
                const imgWidth = 25; // Ancho del logo en el PDF
                const imgHeight = 25; // Altura del logo en el PDF
                const xPosition = doc.internal.pageSize.width - imgWidth - 10; // Ajusta la posición a la derecha
                doc.addImage(imgData, 'PNG', xPosition, 10, imgWidth, imgHeight); // Añadir el logo
                addTableToPDF(doc);
            };
            reader.readAsDataURL(logo);
        } else {
            addTableToPDF(doc);
        }
    };

    const addTableToPDF = (doc) => {
        // Asegúrate de que los campos sean los correctos
        const tableData = users.map(user => [
            user.user_first_name, 
            user.user_last_name, 
            user.user_email, 
            user.user_phone, 
            user.event_name, 
            user.status, 
            new Date(user.registration_date).toLocaleString() // Formatear la fecha
        ]);

        autoTable(doc, {
            head: [['Nombre', 'Apellido', 'Correo', 'Teléfono', 'Evento', 'Estado', 'Fecha de Registro']],
            body: tableData,
            startY: 60, // Ajusta la posición de inicio de la tabla
            styles: {
                overflow: 'linebreak',
                fontSize: 8,
                cellPadding: 3,
                halign: 'center',
                valign: 'middle',
            },
        });
        doc.save('informe_usuarios.pdf'); // Cambia el nombre del archivo si es necesario
    };

    return (
        <div className="create-report-form">
            <h1 className="custom-au-title">Crear Informe de Usuarios</h1>
            <div className='custom-div-cs'>
                <div>
                    <img src={image} alt="documento" className="image-example"/>
                </div>
                <form className="form-report">
                    <div className="input-group">
                        <label>Autor del Informe</label>
                        <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required />
                    </div>
                    <div className="input-group">
                        <label>Logo</label>
                        <small className='text-[#E4E4E4]'>Se recomienda formato PNG y relación de aspecto 1:1</small>
                        <input className='bg-white' type="file" onChange={handleLogoChange} required />
                    </div>
                    <div className="input-group">
                        <label>Fecha de Creación</label>
                        <input type="date" value={printDate} onChange={(e) => setPrintDate(e.target.value)} required />
                        <small className='text-white'>*No es necesario que se llenen todos los campos para generar el informe</small>
                    </div>
                    <button type="button" className="button-imprimir" onClick={handleSaveAsPDF}>Guardar PDF</button>
                </form>
            </div>
        </div>
    );
}
