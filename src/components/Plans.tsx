import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface Payment {
  title: string
  image: string
  link: string
  price: number
}
const Plans: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false)
  const [modalTitle, setModalTitle] = useState<string>('')
  const [modalDetails, setModalDetails] = useState<string>('')
  const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false)
  const [modalPayment, setModalPayment] = useState<Payment>({
    title: '',
    image: '',
    link: '',
    price: 0
  })
  const [copied, setCopied] = useState<boolean>(false)

  const openModal = (title: string, details: string) => {
    setShowModal(true)
    setModalTitle(title)
    setModalDetails(details)
  }
  const openPaymentModal = (
    title: string,
    image: string,
    link: string,
    price: number
  ) => {
    setShowPaymentModal(true)
    setModalPayment({ title: title, image: image, link: link, price: price })
  }
  const closeModal = () => {
    setShowModal(false)
    setShowPaymentModal(false)
  }

  const handleButtonClick = (title: string, details: string) => {
    openModal(title, details)
  }
  const handleButtonClickPayment = (
    title: string,
    image: string,
    link: string,
    price: number
  ) => {
    openPaymentModal(title, image, link, price)
  }

  const renderDetails = (details: string) => {
    return { __html: details.replace(/\/n/g, '<br>') }
  }

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(modalPayment.link)
      .then(() => setCopied(true))
      .catch(error => console.error('Failed to copy:', error))
  }

  const renderDetailPayment = (modalPayment: Payment) => {
    return (
      <div>
        <h2>{modalPayment.title}</h2>
        <img src={modalPayment.image} alt='Imagem de QR Code' />
        <p>
          <strong>Copia e Cola:</strong> {modalPayment.link}
        </p>
        <button onClick={copyToClipboard}>
          {copied ? 'Copiado!' : 'Copiar'}
        </button>

        <p>Preço: {modalPayment.price}</p>
      </div>
    )
  }

  const navigate = useNavigate()
  const goToCadastro = () => {
    navigate('/cadastro')
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
            <button
              className='modal-button'
              onClick={() =>
                handleButtonClickPayment(
                  'Adquirir Plano Basico Mensal',
                  'https://lh3.googleusercontent.com/pw/ABLVV87WOv-QEh0gAT3MMGWqgMCyNI6NUyinICczxKVWE3wnrDWZdG7PIHWuRcm3iqXTnNSwOLvXa_jfqoadCZXjTN0UCx0FsA9ITmpCXTWEmZzvSecnIL6EMqXDV5-jDv1d4E0YmkxeNoYtIConx3VRbicg=w295-h401-s-no-gm?authuser=0',
                  '00020101021126770014br.gov.bcb.pix01362df3eb0b-5bc6-47e8-944c-72b2f8746b5a0215Plataforma Kawa520400005303986540539.995802BR5915KAWA TECNOLOGIA6009SAO PAULO622905251HQ9TJBCHH9ZHXYNA0QJX86H36304588D',
                  39.99
                )
              }
            >
              Adquirir Plano Basico Mensal
            </button>
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
            <button
              className='modal-button'
              onClick={() =>
                handleButtonClickPayment(
                  'Adquirir Plano Basico Anual',
                  '../assets/images/qr-code449.jpeg',
                  '00020101021126770014br.gov.bcb.pix01362df3eb0b-5bc6-47e8-944c-72b2f8746b5a0215Plataforma Kawa520400005303986540539.995802BR5915KAWA TECNOLOGIA6009SAO PAULO622905251HQ9TJBCHH9ZHXYNA0QJX86H36304588D',
                  449.99
                )
              }
            >
              Adquirir Plano Basico Anual
            </button>
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
            <button
              className='modal-button'
              onClick={() =>
                handleButtonClickPayment(
                  'Adquirir Plano Basico Mensal Pontos+',
                  '../assets/images/qr-code49.jpeg',
                  '00020101021126770014br.gov.bcb.pix01362df3eb0b-5bc6-47e8-944c-72b2f8746b5a0215Plataforma Kawa520400005303986540539.995802BR5915KAWA TECNOLOGIA6009SAO PAULO622905251HQ9TJBCHH9ZHXYNA0QJX86H36304588D',
                  49.99
                )
              }
            >
              Adquirir Plano Basico Mensal Pontos+
            </button>
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
            <button
              className='modal-button'
              onClick={() =>
                handleButtonClickPayment(
                  'Adquirir Plano Completo+',
                  '../assets/images/qr-code89.jpeg',
                  '00020101021126770014br.gov.bcb.pix01362df3eb0b-5bc6-47e8-944c-72b2f8746b5a0215Plataforma Kawa520400005303986540539.995802BR5915KAWA TECNOLOGIA6009SAO PAULO622905251HQ9TJBCHH9ZHXYNA0QJX86H36304588D',
                  89.99
                )
              }
            >
              Adquirir Plano Completo+
            </button>
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
      <div
        id='paymentModal'
        className={`modal ${showPaymentModal ? 'show' : ''}`}
      >
        <div className='modal-content'>
          <span className='close' onClick={closeModal}>
            &times;
          </span>
          <h2 id='modal-title'>Pagamento</h2>
          {renderDetailPayment(modalPayment)}
          <button id='modal-pay-button' onClick={goToCadastro}>
            Cadastrar
          </button>
          <p>
            Após o pagamento e o cadastro, aguarde email de confirmação,
            receberá em até 24h.
          </p>
          <p>
            *As próximas cobranças, serão encaminhadas por email e whatsapp.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Plans
