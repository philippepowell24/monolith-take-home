import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Heading, Spacer } from '../components';
import Transactions from '../containers/Transactions';

const UserBalanceDetail = () => {
  const params = useParams();
  return (
    <>
      <Container>
        <Spacer />
        <Heading text={`User ID : ${params?.userId}`} />
        <Spacer />
        <Transactions />
      </Container>
    </>
  );
};

export default UserBalanceDetail;

const Container = styled.div`
  width: ${({ width = '100%' }) => width};
  height: ${({ height = '55vh' }) => height};
  position: relative;
  grid-column: 2/12;
`;
