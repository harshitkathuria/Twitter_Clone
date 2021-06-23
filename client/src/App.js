import "./App.css";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";

import Home from "./components/Home";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import ForgetPassword from "./components/Auth/ForgetPassword";
import ResetPassword from "./components/Auth/ResetPassword";
import LoadUser from "./components/Auth/LoadUser";

import Overview from "./components/Pages/Overview";

import PrivateRoute from "./components/utils/PrivateRoute";
import NonLoggedRoute from "./components/utils/NonLoggedRoute";
import setAuthToken from "./components/utils/setAuthToken";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <LoadUser />
        <Router>
          <Switch>
            <NonLoggedRoute exact path="/" component={Home} />
            <PrivateRoute exact path="/home" component={Overview} />
            <NonLoggedRoute exact path="/login" component={Login} />
            <NonLoggedRoute exact path="/signup" component={Signup} />
            <NonLoggedRoute
              exact
              path="/forgotPassword"
              component={ForgetPassword}
            />
            <NonLoggedRoute path="/resetPassword" component={ResetPassword} />
          </Switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
