import React, { Component } from 'react';
import { Switch } from 'react-router';
import { PrivateRouter } from 'common';
import { TEACHER, STUDENT, MONITOR } from 'common/constants';
import { Home, NewsList, NewsDetail } from 'screens/Home';
import {
	Login, Register, Profile, UpdateProfile,
	UpdatePassword, ResetPassword, CreateNewPassword
} from 'screens/Accounts';
import { DisciplineForm, DisciplineSearch, DisciplineDetail } from 'screens/Disciplines';
import { StudentList } from 'screens/Students';
import "asserts/css/html.css";

class App extends Component {
  	render() {
		return (
			<Switch>
				<PrivateRouter exact path="/" component={Home} />
				<PrivateRouter exact path="/news" component={NewsList} />
				<PrivateRouter exact path="/news/:news" component={NewsDetail} />
				<PrivateRouter exact path="/login" component={Login} />
				<PrivateRouter exact path="/register" component={Register} />
				<PrivateRouter exact path="/reset-password" component={ResetPassword} />
				<PrivateRouter exact path="/create-new-password" component={CreateNewPassword} />
				<PrivateRouter exact path="/profile" component={Profile} />
				<PrivateRouter exact path="/profile/update" component={UpdateProfile} />
				<PrivateRouter exact path="/profile/update-password" component={UpdatePassword} />
				<PrivateRouter exact path="/profile/discipline-form" component={DisciplineForm} requiredPermission={[TEACHER]} />
				<PrivateRouter exact path="/profile/discipline-search" component={DisciplineSearch} requiredPermission={[STUDENT, MONITOR]} />
				<PrivateRouter exact path="/profile/:discipline/detail" component={DisciplineDetail} />
				<PrivateRouter exact path="/profile/:discipline/students" component={StudentList} />
			</Switch>
		)
  	}
}

export default App;
