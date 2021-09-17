import styled from 'styled-components';
import { Nav } from './components';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { ROUTES } from './constants/routes';
import UserBalances from './pages/UserBalances';
import UserBalanceDetail from './pages/UserBalanceDetail';

function App() {
  return (
    <Main>
      <Nav />
      <Router>
        <Switch>
          {/* Redirect from home to /balances */}
          <Route exact path={ROUTES.HOME}>
            <Redirect to={ROUTES.BALANCES_ALL} />
          </Route>
          {/* All user balances */}
          <Route exact path={ROUTES.BALANCES_ALL} component={UserBalances} />
          {/* User balance detail */}
          <Route
            path={`${ROUTES.BALANCES_DETAIL}:userId`}
            component={UserBalanceDetail}
          ></Route>
        </Switch>
      </Router>
    </Main>
  );
}

export default App;

const Main = styled.main`
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: 10vh 1fr;
`;
