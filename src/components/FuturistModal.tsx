import React from 'react'
import { useState } from 'react'
import Modal from 'react-modal'
import '../assets/styles/FuturistModal.css'
interface ModalProps {
  modalIsOpen: boolean
  closeModal: () => void
  recommendation: Recommendation
}

interface Recommendation {
  status: string
  user_id: number
  recommendation: string
  discount_percentage: number
}

const FuturisticModal: React.FC<ModalProps> = ({ modalIsOpen, closeModal, recommendation }) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null)

  const handleCompra = (preferenceId: string) => {
    const url = `/checkout/${preferenceId}`
    window.open(url, '_blank')
  }

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel='Modal de Adquirir Pontos'
      className='futuristic-modal'
      overlayClassName='futuristic-modal-overlay'
    >
      <h2 className='modal-title'>Escolha a quantidade de pontos:</h2>
      <div className='pontos-options-container'>
        {recommendation?.discount_percentage ? (
          <div
            className={`pontos-option ${
              selectedOption === 10000 && 'selected'
            }`}
            onClick={() => setSelectedOption(10000)}
          >
            <p>
              Adquira 10000 Pontos por (R$100,00 - {recommendation.discount_percentage}% de
              Desconto)
            </p>
            <button
              onClick={() =>
                handleCompra('20360613-4285ffea-5b45-4ae4-a1af-0727fbe4f14e')
              }
            >
              Adquirir 10000 Pontos
            </button>
          </div>
        ) : (
          <div
            className={`pontos-option ${
              selectedOption === 10000 && 'selected'
            }`}
            onClick={() => setSelectedOption(10000)}
          >
            <p>Adquira 10000 Pontos por R$100,00</p>
            <button
              onClick={() =>
                handleCompra('20360613-4285ffea-5b45-4ae4-a1af-0727fbe4f14e')
              }
            >
              Adquirir 10000 Pontos
            </button>
          </div>
        )}
        {recommendation?.discount_percentage ? (
          <div
            className={`pontos-option ${
              selectedOption === 20000 && 'selected'
            }`}
            onClick={() => setSelectedOption(20000)}
          >
            <p>
              Adquira 20000 Pontos por (R$200,00 - {recommendation.discount_percentage}% de
              Desconto)
            </p>
            <button
              onClick={() =>
                handleCompra('20360613-4285ffea-5b45-4ae4-a1af-0727fbe4f14e')
              }
            >
              Adquirir 20000 Pontos
            </button>
          </div>
        ) : (
          <div
            className={`pontos-option ${
              selectedOption === 20000 && 'selected'
            }`}
            onClick={() => setSelectedOption(20000)}
          >
            <p>Adquira 20000 Pontos por R$200,00</p>
            <button
              onClick={() =>
                handleCompra('20360613-4285ffea-5b45-4ae4-a1af-0727fbe4f14e')
              }
            >
              Adquirir 20000 Pontos
            </button>
          </div>
        )}
        {recommendation?.discount_percentage ? (
          <div
            className={`pontos-option ${
              selectedOption === 15000 && 'selected'
            }`}
            onClick={() => setSelectedOption(15000)}
          >
            <p>
              Adquira 15000 Pontos por (R$150,00 - {recommendation.discount_percentage}% de
              Desconto)
            </p>
            <button
              onClick={() =>
                handleCompra('20360613-4285ffea-5b45-4ae4-a1af-0727fbe4f14e')
              }
            >
              Adquirir 15000 Pontos
            </button>
          </div>
        ) : (
          <div
            className={`pontos-option ${
              selectedOption === 15000 && 'selected'
            }`}
            onClick={() => setSelectedOption(15000)}
          >
            <p>Adquira 15000 Pontos por R$150,00</p>
            <button
              onClick={() =>
                handleCompra('20360613-4285ffea-5b45-4ae4-a1af-0727fbe4f14e')
              }
            >
              Adquirir 15000 Pontos
            </button>
          </div>
        )}
        {recommendation?.discount_percentage ? (
          <div
            className={`pontos-option ${
              selectedOption === 50000 && 'selected'
            }`}
            onClick={() => setSelectedOption(50000)}
          >
            <p>
              Adquira 50000 Pontos por (R$500,00 - {recommendation.discount_percentage}% de
              Desconto)
            </p>
            <button
              onClick={() =>
                handleCompra('20360613-4285ffea-5b45-4ae4-a1af-0727fbe4f14e')
              }
            >
              Adquirir 50000 Pontos
            </button>
          </div>
        ) : (
          <div
            className={`pontos-option ${
              selectedOption === 50000 && 'selected'
            }`}
            onClick={() => setSelectedOption(50000)}
          >
            <p>Adquira 50000 Pontos por R$500,00</p>
            <button
              onClick={() =>
                handleCompra('20360613-4285ffea-5b45-4ae4-a1af-0727fbe4f14e')
              }
            >
              Adquirir 50000 Pontos
            </button>
          </div>
        )}
      </div>
      <button onClick={closeModal} className='close-button'>
        Fechar
      </button>
    </Modal>
  )
}

export default FuturisticModal
