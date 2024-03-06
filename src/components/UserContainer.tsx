import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import '../assets/styles/PointsModal.css';
import Payment from './Payment';

interface Payment {
  title: string;
  image: string;
  link: string;
  price: number;
}

interface UserData {
  name: string;
  email: string;
  points: number;
  plan_id: number;
  ProfessionalInfo: {
    Tag: {
      tag: string
    }
  }
}

const UserContainer: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);

  const navigate = useNavigate();
  const userName = localStorage.getItem('userName') || '';
  const devTag = localStorage.getItem('tagName') || '';
  const points = localStorage.getItem('userPoints') || '';

  useEffect(() => {
    const storedUserString = localStorage.getItem('user');
    if (storedUserString) {
      const storedUser: UserData = JSON.parse(storedUserString);
      setUser(storedUser);
    }
  }, []);

  const handleAdquirirPontos = () => {
    setModalIsOpen(true);
  };

  const handleProfile = () => {
    navigate('/devs/profile');
  };
 
  const closeModal = () => {
    setModalIsOpen(false);
    setShowPaymentModal(false);
  };

  const handleLogout = () => {
    navigate('/devs/login');
  };

  return (
    <div className='user-container'>
      <h3>{userName}</h3>
      <button onClick={handleProfile}>Perfil do Usuario</button>

      <p>Avaliação: 5</p>
      <p>Tag de Dev: {devTag}</p>
      <p>Pontos: {points}</p>
      <button onClick={handleAdquirirPontos}>Adquirir Pontos</button>
      <button onClick={handleLogout}>Logout</button>

      {user && [5, 6, 7, 8, null].includes(user.plan_id) ? (
        <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel='Modal de Adquirir Pontos'
      >
        <h2>Escolha a quantidade de pontos:</h2>
        <div className='pontos-options-container'>
          <div className='pontos-option'>
            <p>10000 Pontos por R$100,00</p>
            <button onClick={() => {}}>
              Comprar
            </button>
          </div>
          <div className='pontos-option'>
            <p>20000 Pontos por R$200,00</p>
            <button onClick={() => {}}>
              Comprar
            </button>
          </div>
          <div className='pontos-option'>
            <p>50000 Pontos por R$500,00</p>
            <button onClick={()  => {}}>
              Comprar
            </button>
          </div>
          <div className='pontos-option'>
            <p>15000 Pontos por R$150,00</p>
            <button onClick={() => {}}>
              Comprar
            </button>
          </div>
        </div>
        <button onClick={closeModal}>Fechar</button>
      </Modal>
    ) : (
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel='Modal de Adquirir Pontos'
      >
        <h2>Escolha a quantidade de pontos:</h2>
        <div className='pontos-options-container'>
          <div className='pontos-option'>
            <p>1000 Pontos por R$10,00</p>
            <button onClick={() => {}}>
              Comprar
            </button>
          </div>
          <div className='pontos-option'>
            <p>2000 Pontos por R$20,00</p>
            <button onClick={() => {}}>
              Comprar
            </button>
          </div>
          <div className='pontos-option'>
            <p>5000 Pontos por R$50,00</p>
            <button onClick={() => {}}>
              Comprar
            </button>
          </div>
          <div className='pontos-option'>
            <p>10000 Pontos por R$98,00</p>
            <button onClick={() => {}}>
              Comprar
            </button>
          </div>
        </div>
        <button onClick={closeModal}>Fechar</button>
      </Modal>
    )}

      {showPaymentModal && (
        <div id='myModal' className={`modal ${showPaymentModal ? 'show' : ''}`}>
          <div className='modal-content'>
            <span className='close' onClick={() => setShowPaymentModal(false)}>
              &times;
            </span>
            <h2 id='modal-title'>Pagamento</h2>
            <Payment title={'1'} image={''} link={''} price={0} closeModal={closeModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserContainer;