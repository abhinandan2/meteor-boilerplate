import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import Signup from '../ui/Signup';
import Dashboard from '../ui/Dashboard';
import Login from '../ui/Login';
import NotFound from '../ui/NotFound';
import Forecast from '../ui/Forecast';


const unauthenticatedPages = ['/', '/signup'] // These are the pages that authenticated users should not be able to visit
const authenticatedPages = ['/dashboard'] // These are the pages that only authenticated users can visit

const onEnterPublicPage = () => {
	if(Meteor.userId()){
		console.log('Public');
		browserHistory.replace('/dashboard');		
	}
};

const onEnterPrivatePage = () => {
	if(!Meteor.userId()){
		console.log('Private');
		browserHistory.replace('/');
	}
};

export const onAuthChange = (isAuthenticated) => {
	const pathname = browserHistory.getCurrentLocation().pathname;
	const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
	const isAuthenticatedPage = authenticatedPages.includes(pathname);
	
	if(isUnauthenticatedPage && isAuthenticated){
		browserHistory.replace('/dashboard');
	}
	else if (isAuthenticatedPage && !isAuthenticated){
		browserHistory.replace('/');
	}
};

export const routes = (
	<Router history={browserHistory}>
		<Route path="/" component={Login} onEnter={onEnterPublicPage} />
		<Route path="/dashboard" component={Dashboard} onEnter={onEnterPrivatePage} />
		<Route path="/forecast" component={Forecast} onEnter={onEnterPrivatePage} />
		<Route path="/signup" component={Signup} onEnter={onEnterPublicPage} />
		<Route path="*" component={NotFound} />
	</Router>
);
