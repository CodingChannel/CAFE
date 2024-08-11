// src/App.tsx

import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import NavBar from './components/NavBar'; 
import RoutesComponent from './utils/RoutesComponent';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <NavBar />
          <RoutesComponent />
        </div>
      </Router>
    </Provider>
  );
};

export default App;
