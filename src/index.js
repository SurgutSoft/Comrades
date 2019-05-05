import React from 'react';
import { render } from 'react-dom'
import './index.css';
import { Router, browserHistory } from "react-router";
import { routes } from "./routes";
import { Provider } from "react-redux";
import { store } from "./store/ConfigStore";
import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css";
import * as serviceWorker from './serviceWorker';


render(
    // <App />, document.getElementById('root')
    <Provider store={store}>
        <Router history={browserHistory} routes={routes} />
    </Provider>,
    document.getElementById('root')
);




// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
