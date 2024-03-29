import React from 'react';

const Header = () => {
  return (
    <header style={styles.header}>
      <div style={styles.content}>
        <h1 style={styles.heading}>Kawa Solutions</h1>
        <p style={styles.paragraph}>
          Bem-vindo ao nosso site! Oferecemos uma variedade de serviços de
          desenvolvimento junto aos prestadores para atender às suas necessidades.
        </p>
      </div>
    </header>
  );
};

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#fff', 
    color: '#000', 
  },
  content: {
    textAlign: 'center',
  } as React.CSSProperties,
  heading: {
    color: '#007bff',
    fontSize: '2rem',
    marginBottom: '0.5rem',
  },
  paragraph: {
    fontSize: '1rem',
    margin: '0',
  },
};

export default Header;