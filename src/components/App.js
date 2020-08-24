import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';
import './App.css';
import AppRouter from './Router';
import Footer from './Footer';
import { AppContextProvider } from './Context';

function App() {
  return (
    <div className="App">
      <AppContextProvider>
        <Router>
          <Switch>
            <AppRouter />
          </Switch>
          <Footer />
        </Router>
      </AppContextProvider>
    </div>
  );
}

export default App;
