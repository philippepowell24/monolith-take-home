import styled from 'styled-components';
import { Table, Heading, Nav, Loader, Spacer } from './components';
import useTransactions from './hooks/useTransactions';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';

function App() {
  const { processedTransactions, loading, error } = useTransactions();

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <Main>
      <Nav />
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/transactions" />
          </Route>
          <Route exact path="/transactions">
            <>
              <Container>
                <Heading text="All Transactions" />
                <Spacer />
                <Table data={processedTransactions} />
              </Container>
            </>
          </Route>
          <Route path="/transactions/:user_id">
            <h1>Single User View</h1>
          </Route>
        </Switch>
      </Router>
    </Main>
  );
}

export default App;

const Main = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: 10vh 1fr;
  /* background-color: black; */
`;

const Container = styled.div`
  width: ${({ width = '80vw' }) => width};
  height: ${({ height = '80vh' }) => height};
  background-color: white;
  /* overflow-y: scroll; */
  ::-webkit-scrollbar {
    display: none;
  }
  flex: 1;
  grid-column: 2/12;
`;
