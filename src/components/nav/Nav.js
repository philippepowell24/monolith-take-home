import React from 'react';
import { Heading } from '..';
import Logo from '../logo/Logo';
import { Container, Inner } from './NavStyles';

const Nav = () => {
  return (
    <Container>
      <Inner>
        <Logo />
        <Heading text="Dashboard" />
      </Inner>
    </Container>
  );
};

export default Nav;
