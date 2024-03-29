
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import store, { history } from 'config/store';
import * as serviceWorker from './serviceWorker';
import App from './App';

const rootElement = document.getElementById('root');
ReactDOM.render(
    <Provider store={store}>
		<ConnectedRouter history={history}>
			<App />
		</ConnectedRouter>
    </Provider>,
  	rootElement
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();