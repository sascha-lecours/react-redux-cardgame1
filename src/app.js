import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'normalize.css/normalize.css';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { login, logout } from './actions/auth';
import './styles/styles.scss';
import { firebase } from './firebase/firebase';
import LoadingPage from './components/LoadingPage';
import { testCard1, testCard2 } from './gameData/cardList';
import { setHand, setDeck, drawCard, discardCard, reshuffleDiscards } from './actions/cards';

const store = configureStore();

store.subscribe(() => {
	console.log(store.getState());
});

store.dispatch(setHand([testCard1, testCard2]));
store.dispatch(setDeck([testCard1, testCard2, testCard2, testCard2, testCard2, testCard2]));


const jsx = (
	<Provider store={store}>
		<AppRouter />
	</Provider>
);
let hasRendered = false;
const renderApp = () => {
	if (!hasRendered) {
		ReactDOM.render(jsx, document.getElementById('app'));
		hasRendered = true;
	}
};


ReactDOM.render(<LoadingPage />, document.getElementById('app'));


firebase.auth().onAuthStateChanged((user) => {
	if (user) {
		store.dispatch(login(user.uid));
		renderApp();
		if (history.location.pathname === '/') {
			history.push('/dashboard');
		}
	} else {
		store.dispatch(logout());
		renderApp();
		history.push('/');
	}
});
