import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import './App.css';
import AppRouter from './Router';
import Login from './Login';
import Footer from './Footer';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <AppRouter />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
