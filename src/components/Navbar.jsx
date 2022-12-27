import React from 'react';

const Navbar = () => {
  return (
    <nav style={styles.nav}>
      <a style={styles.navText} href="/">Study Zone</a>
    </nav>
  );
};

const styles = {
  nav: {
    display: 'flex',
    alignItems: 'center',
    height: '40px',
    backgroundColor: '#420b79',
  },
  navText: {
    color: '#fff',
    backgroundColor: '#420b79',
    textDecoration: 'none',
    fontSize: '20px',
    fontWeight: 'bold',
    marginLeft: '20px',
  },
  '@media (max-width: 768px)': {
    nav: {
      height: '50px',
    },
    navText: {
      fontSize: '18px',
    },
  },
  '@media (max-width: 480px)': {
    nav: {
      height: '40px',
    },
    navText: {
      fontSize: '16px',
    },
  },
};

export default Navbar;