import React, { useEffect, useState } from 'react'
import './RouteFallback.css'

/**
 * Fallback do Suspense (React.lazy) na navegação entre rotas.
 *
 * Aparece apenas se o chunk da página demorar mais que 250ms —
 * com os chunks pré-buscados (webpackPrefetch) a troca de página
 * resolve em milissegundos e nenhuma tela de carregamento pisca,
 * deixando a navegação fluida. Em conexões lentas, o loader com a
 * marca Kawa surge após o atraso, evitando o "flash" branco.
 */
const RouteFallback: React.FC = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 250)
    return () => clearTimeout(timer)
  }, [])

  if (!visible) return null

  return (
    <div className='route-fallback' role='status' aria-label='Carregando página'>
      <div className='route-fallback__logo-wrap'>
        <img
          className='route-fallback__logo'
          src={require('../assets/images/kawa1.png')}
          alt='Kawa Tecnologia'
        />
      </div>
      <div className='route-fallback__spinner' />
    </div>
  )
}

export default RouteFallback
