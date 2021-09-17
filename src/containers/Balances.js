import React from 'react';
import { useHistory } from 'react-router-dom';
import { useTransition } from 'react-spring';
import styled from 'styled-components';
import { Loader, Paginator, Spacer, Table } from '../components';
import { ROUTES } from '../constants/routes';
import { formatPriceForCell, isBalancePositive } from '../helpers/currency';
import {
  paginateTransactions,
  calcTotalNumberOfPages,
} from '../helpers/pagination';
import usePaginator from '../hooks/usePaginator';
import useTransactions from '../hooks/useTransactions';

const RESULTS_PER_PAGE = 10;

const Balances = () => {
  const { processedTransactions, loading, error } = useTransactions();
  const totalNumberOfPages = calcTotalNumberOfPages(
    processedTransactions,
    RESULTS_PER_PAGE
  );
  const { page, handlePaginatorClick } = usePaginator(totalNumberOfPages);
  const history = useHistory();
  const transition = useTransition(page, {
    initial: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
    from: { opacity: 0, transform: 'translate3d(100%, 0, 0)' },
    enter: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
    leave: { opacity: 0, transform: 'translate3d(-100%, 0, 0)' },
  });

  const balances = React.useMemo(
    () => paginateTransactions(processedTransactions, totalNumberOfPages),
    [processedTransactions, totalNumberOfPages]
  );

  if (loading) {
    return (
      <Container>
        <Loader />
      </Container>
    );
  }
  return (
    <Container>
      <div style={{ position: 'relative', height: '100%', width: '100%' }}>
        {transition((props, _, key) => (
          <Table style={props} key={key} spacing={{ column: 0 }}>
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
                  onClick={() =>
                    history.push(`${ROUTES.TRANSACTIONS_DETAIL}${e?.userId}`)
                  }
                >
                  <Table.Cell>{e?.userId}</Table.Cell>
                  <Table.Cell
                    color={isBalancePositive(e?.total?.GBP) ? 'green' : 'red'}
                  >
                    {formatPriceForCell(e?.total?.GBP)}
                  </Table.Cell>
                  <Table.Cell
                    color={isBalancePositive(e?.total?.USD) ? 'green' : 'red'}
                  >
                    {formatPriceForCell(e?.total?.USD)}
                  </Table.Cell>
                  <Table.Cell
                    color={isBalancePositive(e?.total?.EUR) ? 'green' : 'red'}
                  >
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
  );
};

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
