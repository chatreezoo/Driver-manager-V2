import "./App.css";
import HomePage from "./components/homePage/HomePage";
import Login from "./components/login/Login";
import Register from "./components/login/Register";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Profile from "./components/profile/Profile";
import Driver from "./components/bookDriver/Driver";
import Contact from "./components/contact/Contact";
import BookingReport from "./components/bookingReport/BookingReport";

function App() {
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>

          <Route path="/login">
            <Login />
          </Route>

          <Route path="/register">
            <Register />
          </Route>

          <Route path="/profile">
            <Profile />
          </Route>

          <Route path="/driver">
            <Driver/>
          </Route>

          <Route path="/bookingReport">
          <BookingReport/>
          </Route>

          <Route path="/Contact">
            <Contact/>
          </Route>

        </Switch>
      </Router>
    </div>
  );
}

export default App;

// test***
