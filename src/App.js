import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { Home, NewsList, NewsDetail } from 'screens/Home';
import { Login, Register } from 'screens/Accounts';
import "asserts/css/html.css";

class App extends Component {
  	render() {
		return (
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/news" component={NewsList} />
				<Route exact path="/news/:news" component={NewsDetail} />
				<Route exact path="/login" component={Login} />
				<Route exact path="/register" component={Register} />
			</Switch>
		)
  	}
}

export default App;
