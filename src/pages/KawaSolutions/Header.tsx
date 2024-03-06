import React from 'react';

const Header = () => {
  return (
    <header style={styles.header}>
      <div style={styles.content}>
        <h1>Kawa Solutions</h1>
        <p>Bem-vindo ao nosso site! Oferecemos uma variedade de serviços de desenvolvimento para atender às suas necessidades.</p>
      </div>
    </header>
  );
}

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'center', // Centraliza horizontalmente
    alignItems: 'center', // Centraliza verticalmente
    background: '#f0f0f0', // Cor de fundo para visualização
  },
  content: {
    textAlign: 'center', // Centraliza o conteúdo
  } as React.CSSProperties, // Definir como CSSProperties
};

export default Header;