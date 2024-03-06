import React, { useState } from "react";

interface PaymentProps {
    title: string;
    image: string;
    link: string;
    price: number;
    closeModal: () => void; // Função para fechar o modal
}

const Payment: React.FC<PaymentProps> = ({ title, image, link, price, closeModal }) => {
    const [copied, setCopied] = useState<boolean>(false);

    const copyToClipboard = () => {
        navigator.clipboard
            .writeText(link)
            .then(() => setCopied(true))
            .catch((error) => console.error('Failed to copy:', error));
    };
    
    return (
        <div id='paymentModal' className={`modal show`}>
            <div className='modal-content'>
                <span className='close' onClick={closeModal}>&times;</span>
                <h2 id='modal-title'>{title}</h2>
                <img src={image} alt="Imagem de QR Code" />
                <p><strong>Copia e Cola:</strong> {link}</p>
                <button onClick={copyToClipboard}>{copied ? 'Copiado!' : 'Copiar'}</button>
                <p>Preço: {price}</p>
                <p>Após o pagamento, aguarde email de confirmação, receberá em até 1h.</p>
            </div>
        </div>
    );
};

export default Payment;