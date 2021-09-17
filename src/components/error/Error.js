import React from 'react';

// TODO : Refactor this into styled components and add styling
const Error = ({ error }) => {
  return (
    <div>
      <p>{error}</p>
    </div>
  );
};

export default Error;
