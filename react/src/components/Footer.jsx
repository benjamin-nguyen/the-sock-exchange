import React from 'react';

const Footer = ({ environment }) => {
    const env = environment.toLowerCase();
    const bgClass = env === 'development' ? 'bg-yellow' : env === 'production' ? 'bg-green' : '';
    
    if (env !== 'development' && env !== 'production') {
        return null;
    }

    return (
      <footer className={`footer ${bgClass}`}>
        {environment.toUpperCase()}
      </footer>
    );
};

export default Footer;