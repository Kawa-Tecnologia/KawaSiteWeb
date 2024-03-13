import React, { useEffect } from 'react'
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'

interface MercadoPagoPaymentProps {
  preferenceId: string;
}

const MercadoPagoPayment: React.FC<MercadoPagoPaymentProps> = ({ preferenceId }) => {
  useEffect(() => {
    initMercadoPago(
      process.env.REACT_APP_PUBLIC_KEY_MP ||
        'TEST-f0257295-9b01-40cb-9965-0b5b83bc8a31',
      { locale: 'pt-BR' }
    )
  }, [])

  return (
    <div>
      <Wallet initialization={{ preferenceId }} />
    </div>
  )
}

export default MercadoPagoPayment