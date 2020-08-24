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
import { AppContextProvider } from './Context';

function App() {
  return (
    <div className="App">
      <AppContextProvider>
        <Router>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <AppRouter />
          </Switch>
          <Footer />
        </Router>
      </AppContextProvider>
    </div>
  );
}

export default App;
