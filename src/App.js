import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import 'jquery/dist/jquery.min.js'
import 'popper.js/dist/popper'
import Task from './Components/Task';
import Navegation from './Components/Navegation';
import Login from './Components/Login/Login';
import { Route, BrowserRouter as Router, Switch, useHistory } from "react-router-dom";
import { useState, useEffect } from 'react';
import * as serviceA from '../src/Services/auth.service'
import GuardedRoute from './GuardedRoute';
//<GuardedRoute path='/notas' component={Task} auth={authService.getAuth()} />
function App() {
  const [estado, setEstado] = useState((serviceA.getAuth() === "true"));

  useEffect(() => {
    cambiar();
  }, []);

  let history = useHistory();

  const cambiar = () => {
    setEstado((serviceA.getAuth() === "true"));
    console.log(estado)
  }

  return (
    <div className="App">
      <Router>

        <Navegation></Navegation>
        <Switch>
          <Route path="/" exact component={Login} />
          <GuardedRoute path='/notas' component={Task} auth={true} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
