import React from 'react';
import { Heading } from '..';
import Logo from '../logo/Logo';
import { Container } from './NavStyles';

const Nav = () => {
  return (
    <Container>
      <Logo />
      <Heading text="Dashboard" />
    </Container>
  );
};

export default Nav;
