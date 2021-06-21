import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";

import Home from "./components/Home";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import SideBar from "./components/layout/SideBar";
import ForgetPassword from "./components/Auth/ForgetPassword";

import PrivateRoute from "./components/utils/PrivateRoute";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <PrivateRoute exact path="/home" component={SideBar} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/forgotPassword" component={ForgetPassword} />
          </Switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
