import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './redux/configureStore';
import sagas from './redux/sagas'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import initializeChat from './initializeChat';


let store = configureStore();
store.runSaga(sagas)

ReactDOM.render(
  <Provider store={store}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Provider>,
  document.getElementById('root'),
  startChatJS
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

function startChatJS(){
  if(initializeChat(store)){
    console.log('initializeChat complete')
    return;
  }
  
  console.log('Going to retry in 100ms');
  setTimeout(startChatJS, 100)
}