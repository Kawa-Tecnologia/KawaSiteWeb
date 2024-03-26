import React from 'react'
import MercadoPagoPayment from '../../components/MercadoPagoPayment'
import { useParams } from 'react-router-dom'
import '../../assets/styles/Checkout.css'

const CheckoutPage = () => {
  const { preferenceId } = useParams()

  if (!preferenceId) {
    return null
  }

  return (
    <div className='checkout-container'>
      <img src={require('../../assets/images/kawa.jpg') } alt='Kawa Devs' />
      <h2 style={{ textAlign: "center" }}>Kawa Devs</h2><h2 className='checkout-title'style={{ textAlign: "center" }}>Finalizar Compra</h2><p className='checkout-info'>
        * Por favor, informe os mesmos dados do titular da conta da plataforma
      </p><p className='checkout-info'>
        Clique abaixo para concluir sua compra de forma segura e rápida:
      </p><MercadoPagoPayment preferenceId={preferenceId} />
    </div>
  )
}

export default CheckoutPage
