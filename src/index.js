import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import 'react-notifications/lib/notifications.css';
import "./styles.css";
import UserList from './user';
import UserSideList from './user';
ReactDOM.render(<App />, document.getElementById('root'));
var globalVar;
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
