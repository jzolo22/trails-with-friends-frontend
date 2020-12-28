import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

const rootReducer = (currentState = {trails: []}, action) => {
  // console.log("action: ", action)
  switch (action.type) {
    case "add form":
      return {...currentState, trails: [...currentState.trails, action.payload]}
      default:
        return currentState
      }
      // console.log("current state: ", currentState)
}

const store = createStore(rootReducer)



ReactDOM.render(
  <Provider store={store}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </Provider>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
