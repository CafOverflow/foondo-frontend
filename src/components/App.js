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
          <div className="App2">
            <Switch>
              <AppRouter />
            </Switch>
          </div>
          <Footer />
        </Router>
      </AppContextProvider>
    </div>
  );
}

export default App;
