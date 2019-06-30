import React from 'react';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import DashboardPage from '../components/DashboardPage';
import NotFoundPage from '../components/NotFoundPage';
import LoginPage from '../components/LoginPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import CombatContainer from '../components/CombatContainer';
import GameOverPage from '../components/GameOverPage';
import VictoryPage from '../components/VictoryPage';

export const history = createHistory();


const AppRouter = () => (
	<Router history={history}>
		<div>
			<Switch>
				<PublicRoute exact path="/" component={LoginPage} />
				<PrivateRoute path="/combat" component={CombatContainer} />
				<PrivateRoute path="/gameover" component={GameOverPage} />
				<PrivateRoute path="/victory" component={VictoryPage} />
				<Route component={NotFoundPage} />
			</Switch>
		</div>
	</Router>
);

export default AppRouter;
