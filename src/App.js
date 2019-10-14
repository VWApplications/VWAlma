import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { PrivateRouter } from 'common';
import { TEACHER, STUDENT, MONITOR } from 'common/constants';
import { Home, NewsList, NewsDetail } from 'screens/Home';
import {
	Login, Register, Profile, UpdateProfile,
	UpdatePassword, ResetPassword, CreateNewPassword
} from 'screens/Accounts';
import { DisciplineForm, DisciplineSearch } from 'screens/Disciplines';
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
				<PrivateRouter exact path="/profile" component={Profile} />
				<PrivateRouter exact path="/profile/update" component={UpdateProfile} />
				<PrivateRouter exact path="/profile/update-password" component={UpdatePassword} />
				<PrivateRouter exact path="/profile/discipline-form" component={DisciplineForm} requiredPermission={[TEACHER]} />
				<PrivateRouter exact path="/profile/discipline-search" component={DisciplineSearch} requiredPermission={[STUDENT, MONITOR]} />
			</Switch>
		)
  	}
}

export default App;
