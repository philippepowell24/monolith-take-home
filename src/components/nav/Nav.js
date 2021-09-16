import React from 'react';
import { Heading } from '..';
import Logo from '../logo/Logo';
import { Container, Inner } from './NavStyles';

const Nav = () => {
  return (
    <Container>
      <Inner>
        <Logo />
        <Heading.One>Dashboard</Heading.One>
      </Inner>
    </Container>
  );
};

export default Nav;
