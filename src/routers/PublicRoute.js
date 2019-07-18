import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export const PublicRoute = ({ 
	isAuthenticated,
	component: Component,
	...rest
}) => (
	// TODO: the default redirect should be some sort of title screen, not "combat" in the final version
	<Route {...rest} component={(props) => (
		isAuthenticated ? (
			<Redirect to="/combat" />
		) : (
			<Component {...props} />
		)
	)} />
);

const mapStateToProps = (state) => ({
	isAuthenticated: !!state.auth.uid
});

export default connect(mapStateToProps)(PublicRoute);

// redirect to dashboard if logged in
// render component if not logged in
// apply to login page
