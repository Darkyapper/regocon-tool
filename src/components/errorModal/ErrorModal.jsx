import React from 'react';

const ErrorModal = ({ message, onClose }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content bg-[#1F2937]">
                <p>{message}</p>
                <button onClick={onClose} className="close-button bg-[#DD8329] hover:bg-[#bf7021]">Cerrar</button>
            </div>
        </div>
    );
};

export default ErrorModal;
