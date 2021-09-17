import React from 'react';
import { useHistory } from 'react-router-dom';
import { useTransition } from 'react-spring';
import styled from 'styled-components';
import { Error, Loader, Paginator, Spacer, Table } from '../components';
import { ROUTES } from '../constants/routes';
import { formatPriceForCell } from '../helpers/table';
import {
  paginateTransactions,
  calcTotalNumberOfPages,
} from '../helpers/pagination';
import { selectCellTextColor } from '../helpers/table';
import usePaginator from '../hooks/usePaginator';
import useTransactions from '../hooks/useTransactions';

// Desired results per page to pass to pagination logic
const RESULTS_PER_PAGE = 10;

const Balances = () => {
  // Grab processed transactions
  const { processedTransactions, loading, error } = useTransactions();

  // Compute # of pages
  const totalNumberOfPages = calcTotalNumberOfPages(
    processedTransactions,
    RESULTS_PER_PAGE
  );

  // Grab page state and pagination click handler
  const { page, handlePaginatorClick } = usePaginator(totalNumberOfPages);

  // Router history
  const history = useHistory();

  // React spring transition animation config
  const transition = useTransition(page, {
    initial: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
    from: { opacity: 0, transform: 'translate3d(100%, 0, 0)' },
    enter: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
    leave: { opacity: 0, transform: 'translate3d(-100%, 0, 0)' },
  });

  // Memoize paginated balance entries to avoid recomputing on every render
  const balances = React.useMemo(
    () => paginateTransactions(processedTransactions, totalNumberOfPages),
    [processedTransactions, totalNumberOfPages]
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
    <Container>
      <div style={{ position: 'relative', height: '100%', width: '100%' }}>
        {/* List of user balances with transition config */}
        {transition((props, _, key) => (
          <Table style={props} key={key}>
            <Table.Container spacing={{ column: 0 }}>
              <Table.Head>
                <Table.Row hover={false} pointer={false} opacity={1}>
                  <Table.Header>User ID</Table.Header>
                  <Table.Header>GBP</Table.Header>
                  <Table.Header>USD</Table.Header>
                  <Table.Header>EUR</Table.Header>
                  <Table.Header>Last Activity</Table.Header>
                  <Table.Header>Valid</Table.Header>
                </Table.Row>
              </Table.Head>
              <Table.Body>
                {balances[page - 1]?.map((e) => (
                  <Table.Row
                    key={e?.userId}
                    // Navigate to UserBalanceDetail
                    onClick={() =>
                      history.push(`${ROUTES.BALANCES_DETAIL}${e?.userId}`)
                    }
                  >
                    <Table.Cell>{e?.userId}</Table.Cell>
                    <Table.Cell color={selectCellTextColor(e?.total?.GBP)}>
                      {formatPriceForCell(e?.total?.GBP)}
                    </Table.Cell>
                    <Table.Cell color={selectCellTextColor(e?.total?.USD)}>
                      {formatPriceForCell(e?.total?.USD)}
                    </Table.Cell>
                    <Table.Cell color={selectCellTextColor(e?.total?.EUR)}>
                      {formatPriceForCell(e?.total?.EUR)}
                    </Table.Cell>
                    <Table.Cell>{e?.total?.lastActivity}</Table.Cell>
                    <Table.Cell>
                      <ValidityIndicator
                        color={
                          e?.total?.transactions_with_error?.length > 0
                            ? 'red'
                            : 'green'
                        }
                      />
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Container>
          </Table>
        ))}
      </div>
      <Spacer marginTop={'0.5rem'} marginBottom={'1rem'} />
      {/* Pagination */}
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
      <Spacer marginTop={'0.5rem'} marginBottom={'1rem'} />
    </Container>
  );
};

// Small validity circle showing whether a balance processing encountered an error or not.
// Refactor into own component if used on other pages
const ValidityIndicator = styled.div`
  border-radius: 50%;
  width: 10px;
  height: 10px;
  background-color: ${({ color = 'white' }) => color};
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
`;

export default Balances;
