import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { Home } from 'screens/Home';
import "asserts/css/html.css";

class App extends Component {
  	render() {
		return (
			<Switch>
				<Route exact path="/" component={Home} />
			</Switch>
		)
  	}
}

export default App;
