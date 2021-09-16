import React from 'react';

const Logo = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        // padding: '2rem',
        // backgroundColor: 'green',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gridColumn: '2/3',
        overflow: 'hidden',
      }}
    >
      <img
        src="/assets/logo/logo.png"
        alt="logo"
        style={{
          objectFit: 'contain',
          width: '100%',
          height: '50%',
        }}
      />
    </div>
  );
};

export default Logo;
