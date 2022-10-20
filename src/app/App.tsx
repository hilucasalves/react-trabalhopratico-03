import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import TelaDespesas from './TelaDespesas';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/despesas/:anoMes">
          <TelaDespesas />
        </Route>
        <Redirect to="/despesas/2021-06" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
