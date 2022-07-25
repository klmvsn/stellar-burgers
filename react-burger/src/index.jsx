import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/app.jsx';
import './vendor/normalize.css';
import reportWebVitals from './reportWebVitals';
import { compose, legacy_createStore as createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './services';
import { Provider } from 'react-redux';
import { store } from './services/store';





const root = document.getElementById('root')

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>, root
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
