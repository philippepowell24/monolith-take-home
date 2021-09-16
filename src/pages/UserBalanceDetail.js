import { useTransition } from '@react-spring/core';
import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Heading, Loader, Paginator, Spacer, Table } from '../components';
import { formatPriceForCell, isBalancePositive } from '../helpers/currency';
import {
  calcTotalNumberOfPages,
  paginateTransactions,
} from '../helpers/pagination';
import usePaginator from '../hooks/usePaginator';
import useTransactions from '../hooks/useTransactions';

const RESULTS_PER_PAGE = 10;

const UserBalanceDetail = () => {
  const params = useParams();
  const { processedTransactions, loading, error } = useTransactions();
  const [userBalance] = processedTransactions.filter(
    (e) => e?.userId === params?.userId
  );
  const totalNumberOfPages = calcTotalNumberOfPages(
    userBalance?.total?.transactions,
    RESULTS_PER_PAGE
  );

  const [page, handlePaginatorClick] = usePaginator(totalNumberOfPages);

  const transition = useTransition(page, {
    initial: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
    from: { opacity: 0, transform: 'translate3d(100%, 0, 0)' },
    enter: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
    leave: { opacity: 0, transform: 'translate3d(-100%, 0, 0)' },
  });

  const transactions = React.useMemo(
    () =>
      paginateTransactions(
        userBalance?.total?.transactions,
        totalNumberOfPages
      ),
    [userBalance?.total?.transactions, totalNumberOfPages]
  );

  if (loading) {
    return (
      <Container>
        <Loader />
      </Container>
    );
  }

  return (
    <>
      <Container>
        <Spacer />
        <Heading text={`User ID : ${params?.userId}`} />
        <Spacer />
        <div style={{ position: 'relative', height: '15%', width: '100%' }}>
          <Table>
            <Table.Head>
              <Table.Row hover={false} pointer={false} opacity={1}>
                <Table.Header>GBP</Table.Header>
                <Table.Header>USD</Table.Header>
                <Table.Header>EUR</Table.Header>
                <Table.Header>Last Activity</Table.Header>
                <Table.Header># Transactions</Table.Header>
              </Table.Row>
            </Table.Head>
            <Table.Body>
              <Table.Row key={userBalance?.userId} hover={false}>
                <Table.Cell
                  color={
                    isBalancePositive(userBalance?.total?.GBP) ? 'green' : 'red'
                  }
                >
                  {formatPriceForCell(userBalance?.total?.GBP)}
                </Table.Cell>
                <Table.Cell
                  color={
                    isBalancePositive(userBalance?.total?.USD) ? 'green' : 'red'
                  }
                >
                  {formatPriceForCell(userBalance?.total?.USD)}
                </Table.Cell>
                <Table.Cell
                  color={
                    isBalancePositive(userBalance?.total?.EUR) ? 'green' : 'red'
                  }
                >
                  {formatPriceForCell(userBalance?.total?.EUR)}
                </Table.Cell>
                <Table.Cell>{userBalance?.total?.lastActivity}</Table.Cell>
                <Table.Cell>
                  {userBalance?.total?.transactions?.length}
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </div>
        <Spacer />
        <div style={{ position: 'relative', height: '100%', width: '100%' }}>
          {transition((props, _, key) => (
            <Table style={props}>
              <Table.Head>
                <Table.Row hover={false} pointer={false} opacity={1}>
                  <Table.Header>Amount</Table.Header>
                  <Table.Header>Currency</Table.Header>
                  <Table.Header>Timestamp</Table.Header>
                </Table.Row>
              </Table.Head>
              <Table.Body>
                {transactions[page - 1]?.map((e) => {
                  const amount = parseFloat(e?.amount);
                  return (
                    <Table.Row key={e?.amount} hover={false} pointer={false}>
                      <Table.Cell
                        color={isBalancePositive(amount) ? 'green' : 'red'}
                      >
                        {formatPriceForCell(amount)}
                      </Table.Cell>
                      <Table.Cell>{e?.currency}</Table.Cell>
                      <Table.Cell>{e?.timestamp}</Table.Cell>
                    </Table.Row>
                  );
                })}
                {transactions[page - 1]?.length < RESULTS_PER_PAGE && (
                  <Table.Row fullHeight />
                )}
              </Table.Body>
            </Table>
          ))}
        </div>
        <Spacer marginTop={'0.5rem'} marginBottom={'1rem'} />
        <Paginator>
          <Paginator.Left
            onClick={() => handlePaginatorClick('left')}
            style={{ opacity: page === 1 ? 0.2 : 1, cursor: 'pointer' }}
          />
          <Paginator.Text>{`${page} of ${totalNumberOfPages}`}</Paginator.Text>
          <Paginator.Right
            onClick={() => handlePaginatorClick('right')}
            style={{
              opacity: page === totalNumberOfPages ? 0.2 : 1,
              cursor: 'pointer',
            }}
          />
        </Paginator>
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
