import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import configureStore from './configureStore';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { initialState } from './store/reducers/reducer';
import CriticalAppError from './wrappers/error-boundary/CriticalAppError';

const store = configureStore({ seatState: initialState });

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <CriticalAppError>
        <App />
      </CriticalAppError>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
