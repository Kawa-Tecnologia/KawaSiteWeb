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
      <MercadoPagoPayment preferenceId={ preferenceId } />
    </div>
  )
}

export default CheckoutPage
