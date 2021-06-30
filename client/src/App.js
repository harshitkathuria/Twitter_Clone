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
import Alert from "./components/layout/Alert";

import Overview from "./components/Pages/Overview";
import AuthHome from "./components/Pages/Home";
import Profile from "./components/Pages/Profile/Profile";

import PrivateRoute from "./components/utils/PrivateRoute";
import NonLoggedRoute from "./components/utils/NonLoggedRoute";
import setAuthToken from "./components/utils/setAuthToken";
import Messenger from "./components/Pages/Messenger/Messenger";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <LoadUser />
        <Alert />
        <Router>
          <Switch>
            <NonLoggedRoute exact path="/" component={Home} />
            <NonLoggedRoute exact path="/login" component={Login} />
            <NonLoggedRoute exact path="/signup" component={Signup} />
            <NonLoggedRoute
              exact
              path="/forgotPassword"
              component={ForgetPassword}
            />
            <NonLoggedRoute path="/resetPassword" component={ResetPassword} />
            <PrivateRoute path="/home" component={Overview} page={AuthHome} />
            <PrivateRoute
              path="/profile/:id"
              component={Overview}
              page={Profile}
            />
            <PrivateRoute
              path="/messages"
              component={Overview}
              page={Messenger}
            />
          </Switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
