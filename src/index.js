
import React from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import store from './app/store';
import './index.css'
import ToggleColorMode from './utils/ToggleColorMode';

const root = ReactDOM.createRoot(
   document.getElementById('root'),
);

root.render(
  <Provider store={store}>
    <ToggleColorMode>
      <Router><App /></Router>
    </ToggleColorMode>
  </Provider>,
);
