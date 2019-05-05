import React from 'react';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import DashboardPage from '../components/DashboardPage';
import NotFoundPage from '../components/NotFoundPage';
import LoginPage from '../components/LoginPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import GameOverPage from '../components/GameOverPage';

export const history = createHistory();


const AppRouter = () => (
	<Router history={history}>
		<div>
			<Switch>
				<PublicRoute exact path="/" component={LoginPage} />
				<PrivateRoute path="/dashboard" component={DashboardPage} />
				<PrivateRoute path="/gameover" component={GameOverPage} />
				<Route component={NotFoundPage} />
			</Switch>
		</div>
	</Router>
);

export default AppRouter;
