import React, { useState } from 'react';

interface ModalProps {
  closeModal: () => void;
  title: string;
  html: string | TrustedHTML;
}

const Modal: React.FC<ModalProps> = ({ closeModal, title, html }) => {
  const [showModal, setShowModal] = useState<boolean>(true);

  const handleCloseModal = () => {
    setShowModal(false);
    closeModal();
  };

  const renderDetails = (html: string | TrustedHTML) => {
    // eslint-disable-next-line no-debugger
    debugger
    return { __html: html };
  };

  return (
    <div id='myModal' className={`modal ${showModal ? 'show' : ''}`}>
      <div className='modal-content'>
        <span className='close' onClick={handleCloseModal}>
          &times;
        </span>
        <h2 id='modal-title'>{title}</h2>
        <p id='modal-details' dangerouslySetInnerHTML={renderDetails(html)}></p>
      </div>
    </div>
  );
};

export default Modal;