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
        <div>
          <Spacer />
          <Heading.Two>{`User ID : ${params?.userId}`}</Heading.Two>
          <Spacer />
        </div>
        <Transactions />
      </Container>
    </>
  );
};

export default UserBalanceDetail;

const Container = styled.div`
  width: ${({ width = '100%' }) => width};
  /* height: ${({ height = '90vh' }) => height}; */
  position: relative;
  grid-column: 2/12;
  display: flex;
  flex: 1;
  flex-direction: column;
`;
