import React from 'react';
import styled from 'styled-components';
import { Heading, Spacer } from '../components';
import Balances from '../containers/Balances';

const UserBalances = () => {
  return (
    <>
      <Container>
        <Spacer />
        <Heading.Two>User Balances</Heading.Two>
        <Spacer />
        <Balances />
      </Container>
    </>
  );
};

export default UserBalances;

const Container = styled.div`
  width: ${({ width = '100%' }) => width};
  height: ${({ height = '75vh' }) => height};
  position: relative;
  grid-column: 2/12;
`;
