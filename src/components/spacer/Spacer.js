import React from 'react';
import { Container } from './SpacerStyles';

const Spacer = ({ marginTop = '2rem', marginBottom = '2rem' }) => {
  return <Container marginTop={marginTop} marginBottom={marginBottom} />;
};

export default Spacer;
