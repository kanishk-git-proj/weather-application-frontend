// src/components/ErrorModal.js
import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); 

const ErrorModal = ({ isOpen, onRequestClose, errorMessage }) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    contentLabel="Error"
    style={{
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
        padding: '20px',
        borderRadius: '10px',
      },
      overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
    }}
  >
    <h2>Error</h2>
    <p>{errorMessage}</p>
    <button onClick={onRequestClose}>Close</button>
  </Modal>
);

export default ErrorModal;
