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
import { ROUTES } from './constants/routes';
import TransactionsAll from './pages/TransactionsAll';

function App() {
  return (
    <Main>
      <Nav />
      <Router>
        <Switch>
          <Route exact path={ROUTES.HOME}>
            <Redirect to={ROUTES.TRANSACTIONS_ALL} />
          </Route>
          <Route exact path={ROUTES.TRANSACTIONS_ALL}>
            <TransactionsAll />
          </Route>
          <Route path={ROUTES.TRANSACTIONS_DETAIL}>
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
  /* align-items: center; */
  flex-direction: column;
  height: 100vh;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: 10vh 1fr;
  /* background-color: black; */
`;
