import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import GuardedRoute from "./components/GuardedRoute";
import Home from "./components/home/Home";
import Menu from "./components/menu/index";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={Signup} />
        <GuardedRoute path="/menu" exact component={Menu} />
        {/* <Route path="/" render={() => <div>404</div>} /> */}
      </Switch>
    </Router>
  );
}

export default App;
