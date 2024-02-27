import React, { useState } from 'react'

const Plans: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false)
  const [modalTitle, setModalTitle] = useState<string>('')
  const [modalDetails, setModalDetails] = useState<string>('')

  const openModal = (title: string, details: string) => {
    setShowModal(true)
    setModalTitle(title)
    setModalDetails(details)
  }

  const closeModal = () => {
    setShowModal(false)
  }

  const handleButtonClick = (title: string, details: string) => {
    openModal(title, details)
  }

  const renderDetails = (details: string) => {
    return { __html: details.replace(/\/n/g, '<br>') }
  }

  return (
    <div>
      <section id='planos'>
        <h2>Planos</h2>
        <div className='plano-container'>
          <div className='plano'>
            <h3>Plano Basico Mensal</h3>
            <p>Acesso ao grupo no Discord e a plataforma.</p>
            <p>+1000 pontos</p>
            <p>Preço: R$39,99/mês</p>
            <button
              className='modal-button'
              onClick={() =>
                handleButtonClick(
                  'Plano Basico Mensal',
                  'Acesso ao grupo no Discord e a plataforma.<p>+1000 pontos</p><br>Por apenas R$39,99/mês.<br>*Pare quando quiser'
                )
              }
            >
              Mais Detalhes
            </button>
            <br />
            <button>Adquirir Plano Basico Mensal</button>
          </div>
          <div className='plano'>
            <h3>Plano Basico Anual</h3>
            <p>Acesso ao grupo no Discord e a plataforma.</p>
            <p>+5000 pontos</p>
            <p>Preço: de R$479,99/ano por apenas R$449,99/ano</p>
            <button
              className='modal-button'
              onClick={() =>
                handleButtonClick(
                  'Plano Basico Anual',
                  'Acesso ao grupo no Discord e a plataforma.<br><p>+5000 pontos</p>De R$479,99/ano por apenas R$449,99/ano<br>*Pare quando quiser'
                )
              }
            >
              Mais Detalhes
            </button>
            <br />
            <button>Adquirir Plano Basico Anual</button>
          </div>
          <div className='plano'>
            <h3>Plano Basico Mensal Pontos+</h3>
            <p>Acesso ao grupo no Discord e a plataforma.</p>
            <p>+2200 Pontos</p>
            <p>Preço: R$49,99 primeiro mês + R$39,99/mês</p>
            <button
              className='modal-button'
              onClick={() =>
                handleButtonClick(
                  'Plano Basico Mensal Pontos+',
                  'Acesso ao grupo no Discord e a plataforma.<br>+2200 Pontos .<br>Por apenas R$49,99 primeiro mês + R$39,99/mês<br>*Pare quando quiser'
                )
              }
            >
              Mais Detalhes
            </button>
            <br />
            <button>Adquirir Plano Basico Mensal Pontos+</button>
          </div>
          <div className='plano'>
            <h3>Plano Completo+</h3>
            <p>Acesso ao grupo no Discord e a plataforma.</p>
            <p>+5000 Pontos</p>
            <p>Preço: R$89,99/mês</p>
            <button
              className='modal-button'
              onClick={() =>
                handleButtonClick(
                  'Plano Completo+',
                  'Acesso ao grupo no Discord e a plataforma.<br>Maior divulgação para Recrutadores<br>Maior Destaque na Plataforma<br><p>+5000 Pontos</p>Por apenas R$89,99/mês<br>*Pare quando quiser'
                )
              }
            >
              Mais Detalhes
            </button>
            <br />
            <button>Adquirir Plano Completo+</button>
          </div>
        </div>
      </section>
      <div id='myModal' className={`modal ${showModal ? 'show' : ''}`}>
        <div className='modal-content'>
          <span className='close' onClick={closeModal}>
            &times;
          </span>
          <h2 id='modal-title'>{modalTitle}</h2>
          <p
            id='modal-details'
            dangerouslySetInnerHTML={renderDetails(modalDetails)}
          ></p>
          <button id='modal-buy-button'>Adquirir Plano</button>
        </div>
      </div>
    </div>
  )
}

export default Plans
