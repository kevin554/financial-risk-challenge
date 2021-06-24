import './App.scss';
import Header from './components/header';
import Home from './pages/home';
import Calculator from './pages/calculator';

import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

function App() {
  return <div>
    <Router>
      <div>
        <Header />

        <Switch>
          <Route exact path="/home" component={Home} />
          <Route exact path="/calculator" component={Calculator} />
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route path="*">
            <Redirect to="/home" />
          </Route>
        </Switch>
      </div>
    </Router>
  </div>;
}

export default App;
