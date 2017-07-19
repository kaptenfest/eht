// StyleSheets 
import NormalizeCSS from "../css/normalize.css";
import globalCss from "../css/00-global.css";
import LoginCss from "../css/01-login.css";
import ErrandCss from "../css/02-errandOptions.css";
import BasicInfoCss from "../css/03-basicInfo.css";
import LearningCSS from "../css/04-learningInfo.css";
import BehaviorCSS from "../css/05-behaviorInfo.css";
import FeelingInfoCSS from "../css/06-feelingsInfo.css";
import SummaryCSS from "../css/07-summary.css";
import AdminCSS from "../css/08-admin.css";


// import testCss from "../css/01-test.css";

// React 
import React from 'react';
import ReactDOM from 'react-dom';

// Redux 
import { createStore, applyMiddleware } from 'redux';

	// React-Redux 
	import { Provider } from 'react-redux';
	
	// Redux Logger 
	import createLogger from 'redux-logger';
	
	// Redux Thunk 
	import thunk from "redux-thunk";
	
	// Reducers 
	import reducers from './reducers';

// React Router
import {Router, Route, IndexRoute, Link, IndexLink, IndexRedirect, browserHistory} from 'react-router';

// Firebase 
import * as firebase from "firebase";


// Components / Containers
// import AdminLogin from "./components/Admin_Login";
import AdminOptions from "./components/Admin_Options";
import CreateUser from "./components/Create_User";
import BrowseUsers from "./containers/Browse_Users";
import BrowseErrands from "./containers/Browse_Errands";
import BrowseErrandDetails from "./containers/Browse_ErrandDetails";

import Login from "./components/Login";
import ErrandOptions from "./components/Errand_Options";
import StudentBasicInfo from "./components/Student_BasicInfo";
import StudentLearningInfo from "./containers/Student_LearningInfo";
import StudentBehaviorInfo from "./containers/Student_BehaviorInfo";
import StudentFeelingsInfo from "./containers/Student_FeelingsInfo";
import StudentSummary from "./containers/Student_Summary";


// Constants 
const logger = createLogger(); // Logger
const createStoreWithMiddleware = applyMiddleware(logger, thunk)(createStore); // Create Store and add Middleware
const app = document.getElementById("app"); // Mount



ReactDOM.render(
	<Provider store={createStoreWithMiddleware(reducers)}>
	 	<Router history={hashHistory}>
	 		<Route path='/' component={Login} />

				<Route path='admin-options' component={AdminOptions} />
				<Route path='create-user' component={CreateUser} />
				<Route path='browse-users' component={BrowseUsers} />
				<Route path='browse-errands/:id/:displayName' component={BrowseErrands} />
				<Route path='browse-errand-details/:id/:errand_id/:displayName' component={BrowseErrandDetails} />


				<Route path='errand-options' component={ErrandOptions} />
				<Route path='student-basic-info' component={StudentBasicInfo} />
				<Route path='student-learning-info' component={StudentLearningInfo} />
				<Route path='student-behavior-info' component={StudentBehaviorInfo} />
				<Route path='student-feelings-info' component={StudentFeelingsInfo} />
				<Route path='student-summary' component={StudentSummary} />
		</Router>
	</Provider>,
	app
);

// <Route path='admin-login' component={AdminLogin} />