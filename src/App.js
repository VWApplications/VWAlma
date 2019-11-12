import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
import { PrivateRouter } from 'common';
import { TEACHER, STUDENT, ADMIN } from 'common/constants';
import { Home, NewsList, NewsDetail } from 'screens/Home';
import {
	Login, Register, Profile, UpdateProfile,
	UpdatePassword, ResetPassword, CreateNewPassword
} from 'screens/Accounts';
import { DisciplineForm, DisciplineSearch, DisciplineDetail } from 'screens/Disciplines';
import { StudentList } from 'screens/Students';
import { GroupList } from 'screens/Groups';
import { SectionList, SectionDetails } from 'screens/Sections';
import { QuestionForm, Exercises } from 'screens/Exercises';
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
				<PrivateRouter exact path="/profile/discipline-form" component={DisciplineForm} requiredPermission={[TEACHER, ADMIN]} />
				<PrivateRouter exact path="/profile/discipline-search" component={DisciplineSearch} requiredPermission={[STUDENT, ADMIN]} />
				<PrivateRouter exact path="/profile/:discipline/detail" component={DisciplineDetail} />
				<PrivateRouter exact path="/profile/:discipline/students" component={StudentList} />
				<PrivateRouter exact path="/profile/:discipline/groups" component={GroupList} />
				<PrivateRouter exact path="/profile/:discipline/sections" component={SectionList} />
				<PrivateRouter exact path="/profile/:discipline/sections/:section/detail" component={SectionDetails} />
				<PrivateRouter exact path="/profile/:discipline/sections/:section/questions" component={QuestionForm} />
				<PrivateRouter exact path="/profile/:discipline/sections/:section/exercises" component={Exercises} />
				<Route exact path='*' component={Home} />
			</Switch>
		)
  	}
}

export default App;
