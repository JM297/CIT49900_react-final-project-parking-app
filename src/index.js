import React from 'react';
import ReactDOM from 'react-dom';
import{createStore} from "redux"; // takes in a value and making it the store
import {Provider} from 'react-redux'; // similar to browserRouter except that Provider can give access globally to the store
import rootReducer from "./redux/reducers";
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const store = createStore(rootReducer);

ReactDOM.render (
    <Provider store={store}><App /></Provider>, document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
