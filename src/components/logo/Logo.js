import React from 'react';

const Logo = () => {
  return (
    <div
      style={{
        // width: '100%',
        // height: '100%',
        // padding: '2rem',
        // backgroundColor: 'green',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // overflow: 'hidden',
        height: 'inherit',
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
