import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Heading, Spacer, Table } from '../components';
import { formatPriceForCell, isBalancePositive } from '../helpers/currency';
import useTransactions from '../hooks/useTransactions';

const UserBalanceDetail = () => {
  const params = useParams();
  const { processedTransactions, loading, error } = useTransactions();
  const [userBalance] = processedTransactions.filter(
    (e) => e?.userId === params?.userId
  );

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
              </Table.Row>
            </Table.Body>
          </Table>
        </div>
        <Spacer />
        <div style={{ position: 'relative', height: '100%', width: '100%' }}>
          <Table>
            <Table.Head>
              <Table.Row hover={false} pointer={false} opacity={1}>
                <Table.Header>Amount</Table.Header>
                <Table.Header>Currency</Table.Header>
                <Table.Header>Timestamp</Table.Header>
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {userBalance?.total?.transactions?.map((e) => {
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
            </Table.Body>
          </Table>
        </div>
      </Container>
    </>
  );
};

export default UserBalanceDetail;

const Container = styled.div`
  width: ${({ width = '100%' }) => width};
  height: ${({ height = '65vh' }) => height};
  position: relative;
  grid-column: 2/12;
`;
