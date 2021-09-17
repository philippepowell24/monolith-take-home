import { useTransition } from '@react-spring/core';
import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import {
  Error,
  Heading,
  Loader,
  Paginator,
  Spacer,
  Table,
} from '../components';
import { isAmountValid, isBalancePositive } from '../helpers/currency';
import {
  calcTotalNumberOfPages,
  paginateTransactions,
} from '../helpers/pagination';
import { formatPriceForCell, selectCellTextColor } from '../helpers/table';
import usePaginator from '../hooks/usePaginator';
import useTransactions from '../hooks/useTransactions';

const RESULTS_PER_PAGE = 8;

const Transactions = () => {
  // Grab route params to access userId
  const params = useParams();

  // Grab processed transactions
  const { processedTransactions, loading, error } = useTransactions();

  // Find specific user balance based on userId
  const [userBalance] = processedTransactions.filter(
    (e) => e?.userId === params?.userId
  );

  // Compute # of pages
  const totalNumberOfPages = calcTotalNumberOfPages(
    userBalance?.total?.transactions,
    RESULTS_PER_PAGE
  );

  // Grab page state and pagination click handler
  const { page, handlePaginatorClick } = usePaginator(totalNumberOfPages);

  // React spring transition animation config
  const transition = useTransition(page, {
    initial: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
    from: { opacity: 0, transform: 'translate3d(100%, 0, 0)' },
    enter: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
    leave: { opacity: 0, transform: 'translate3d(-100%, 0, 0)' },
  });

  // Memoize paginated transaction entries to avoid recomputing on every render
  const transactions = React.useMemo(
    () =>
      paginateTransactions(
        userBalance?.total?.transactions,
        totalNumberOfPages,
        RESULTS_PER_PAGE
      ),
    [userBalance?.total?.transactions, totalNumberOfPages]
  );

  // Handle network latency while fetching transactions
  if (loading) {
    return (
      <Container>
        <Loader />
      </Container>
    );
  }

  // Handle network error while fetching transactions
  if (error) {
    return (
      <Container>
        <Error error={error} />
      </Container>
    );
  }

  return (
    <>
      <div style={{ flex: 1 }}>
        <Heading.Three>Balance Overview</Heading.Three>
        <Spacer marginTop={'0.5rem'} marginBottom={'1rem'} />
        <Table position="relative">
          <Table.Container>
            <Table.Head>
              <Table.Row hover={false} pointer={false} opacity={1}>
                <Table.Header>GBP</Table.Header>
                <Table.Header>USD</Table.Header>
                <Table.Header>EUR</Table.Header>
                <Table.Header>Last Activity</Table.Header>
                <Table.Header>Total Transactions</Table.Header>
                <Table.Header>Transactions With Error</Table.Header>
              </Table.Row>
            </Table.Head>
            <Table.Body>
              <Table.Row key={userBalance?.userId} hover={false}>
                <Table.Cell
                  color={selectCellTextColor(userBalance?.total?.GBP)}
                >
                  {formatPriceForCell(userBalance?.total?.GBP)}
                </Table.Cell>
                <Table.Cell
                  color={selectCellTextColor(userBalance?.total?.USD)}
                >
                  {formatPriceForCell(userBalance?.total?.USD)}
                </Table.Cell>
                <Table.Cell
                  color={selectCellTextColor(userBalance?.total?.EUR)}
                >
                  {formatPriceForCell(userBalance?.total?.EUR)}
                </Table.Cell>
                <Table.Cell>{userBalance?.total?.lastActivity}</Table.Cell>
                <Table.Cell>
                  {`${
                    userBalance?.total?.transactions?.length +
                    userBalance?.total?.transactions_with_error?.length
                  }`}
                </Table.Cell>
                <Table.Cell>
                  {userBalance?.total?.transactions_with_error?.length}
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table.Container>
        </Table>
      </div>
      <div style={{ flex: 6, width: '100%' }}>
        <Spacer marginTop={'3.5rem'} marginBottom={'3.5rem'} />
        <Heading.Three>Transaction Errors</Heading.Three>
        <Spacer marginTop={'0.5rem'} marginBottom={'0.5rem'} />
        {/* Transactions with error table */}
        {userBalance?.total?.transactions_with_error?.length > 0 ? (
          <Table position="relative">
            <Table.Container>
              <Table.Head>
                <Table.Row hover={false} pointer={false} opacity={1}>
                  <Table.Header>Amount</Table.Header>
                  <Table.Header>Currency</Table.Header>
                  <Table.Header>Timestamp</Table.Header>
                  <Table.Header>Error</Table.Header>
                </Table.Row>
              </Table.Head>
              <Table.Body>
                {userBalance?.total?.transactions_with_error?.map((e) => {
                  return (
                    <Table.Row
                      key={e?.transaction?.amount}
                      hover={false}
                      pointer={false}
                    >
                      <Table.Cell>
                        {isAmountValid(e?.transaction?.amount)
                          ? formatPriceForCell(
                              parseFloat(e?.transaction?.amount)
                            )
                          : e?.transaction?.amount}
                      </Table.Cell>
                      <Table.Cell>{e?.transaction?.currency}</Table.Cell>
                      <Table.Cell>{e?.transaction?.timestamp}</Table.Cell>
                      <Table.Cell color="red">{e?.error}</Table.Cell>
                    </Table.Row>
                  );
                })}

                <Table.Row fullHeight />
              </Table.Body>
            </Table.Container>
          </Table>
        ) : (
          <Heading.Four>
            There are no transaction errors to display
          </Heading.Four>
        )}
      </div>
      <div
        style={{
          flex: 1,
          width: '100%',
          minHeight: '350px',
        }}
      >
        <Spacer marginTop={'1.5rem'} marginBottom={'1.5rem'} />
        <Heading.Three>All Transactions</Heading.Three>
        <Spacer marginTop={'0.5rem'} marginBottom={'0.5rem'} />
        {/* All User Transactions */}
        <div style={{ position: 'relative', height: '100%', width: '100%' }}>
          {transition((props, _, key) => (
            <Table style={props} key={key}>
              <Table.Container>
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
              </Table.Container>
            </Table>
          ))}
        </div>
        <Spacer marginTop={'0.5rem'} marginBottom={'1rem'} />
        {/* Transaction pagination */}
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
      </div>
      <Spacer marginTop={'10rem'} />
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export default Transactions;
