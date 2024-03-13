import React from 'react'

const Header = () => {
  return (
    <header style={styles.header}>
      <div style={styles.content}>
        <h1>Kawa Solutions</h1>
        <p>
          Bem-vindo ao nosso site! Oferecemos uma variedade de serviços de
          desenvolvimento para atender às suas necessidades.
        </p>
      </div>
    </header>
  )
}

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#f0f0f0'
  },
  content: {
    textAlign: 'center'
  } as React.CSSProperties
}

export default Header
