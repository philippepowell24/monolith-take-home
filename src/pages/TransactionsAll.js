import React from 'react';
import styled from 'styled-components';
import { Heading, Loader, Spacer, Table } from '../components';
import Transactions from '../containers/Transactions';
import useTransactions from '../hooks/useTransactions';

const TransactionsAll = () => {
  const { processedTransactions, loading, error } = useTransactions();

  // if (loading) {
  //   return (
  //     <Container>
  //       <Loader />
  //       {/* <h1>Loading...</h1> */}
  //     </Container>
  //   );
  // }

  // if (error) {
  //   return <h1>{error}</h1>;
  // }
  return (
    <>
      <Container>
        <Spacer />
        <Heading text="All Transactions" />
        {/* <Spacer />
        <Table data={processedTransactions} /> */}
        <Spacer />
        <Transactions />
      </Container>
    </>
  );
};

export default TransactionsAll;

const Container = styled.div`
  width: ${({ width = '100%' }) => width};
  height: ${({ height = '65vh' }) => height};
  /* background-color: cyan; */
  position: relative;
  grid-column: 2/12;
`;
