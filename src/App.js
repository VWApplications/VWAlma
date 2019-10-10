import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { Home, NewsList, NewsDetail } from 'screens/Home';
import {
	Login, Register, Profile, UpdateProfile,
	UpdatePassword, ResetPassword, CreateNewPassword
} from 'screens/Accounts';
import { DisciplineForm } from 'screens/Disciplines';
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
				<Route exact path="/reset-password" component={ResetPassword} />
				<Route exact path="/create-new-password" component={CreateNewPassword} />
				<Route exact path="/profile" component={Profile} />
				<Route exact path="/profile/update" component={UpdateProfile} />
				<Route exact path="/profile/update-password" component={UpdatePassword} />
				<Route exact path="/profile/discipline-form" component={DisciplineForm} />
			</Switch>
		)
  	}
}

export default App;
