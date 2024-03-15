import React from 'react'
import MercadoPagoPayment from '../../components/MercadoPagoPayment'
import { useParams } from 'react-router-dom'

const CheckoutPage = () => {
  const { preferenceId } = useParams()
  if (!preferenceId) {
    return null
  }
  return (
    <div>
      <h1>Checkout</h1>
      <p>* Por favor, informe os mesmos dados do titular da conta da plataforma</p>
      <p>Clique abaixo</p>
      <MercadoPagoPayment preferenceId={ preferenceId } />
    </div>
  )
}

export default CheckoutPage
