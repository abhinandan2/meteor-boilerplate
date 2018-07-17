import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import Signup from '../ui/Signup'
import Link from '../ui/Link'
import Login from '../ui/Login'
import NotFound from '../ui/NotFound'


const unauthenticatedPages = ['/', '/signup'] // These are the pages that authenticated users should not be able to visit
const authenticatedPages = ['/links'] // These are the pages that only authenticated users can visit

const onEnterPublicPage = () => {
	if(Meteor.userId()){
		console.log('Public');
		browserHistory.replace('/links');		
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
		browserHistory.replace('/links');
	}
	else if (isAuthenticatedPage && !isAuthenticated){
		browserHistory.replace('/')
	}
};

export const routes = (
	<Router history={browserHistory}>
		<Route path="/" component={Login} onEnter={onEnterPublicPage} />
		<Route path="/links" component={Link} onEnter={onEnterPrivatePage} />
		<Route path="/signup" component={Signup} onEnter={onEnterPublicPage} />
		<Route path="*" component={NotFound} />
	</Router>
);
