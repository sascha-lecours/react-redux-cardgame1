import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';
import cardsReducer from '../reducers/cards';
import enemiesReducer from '../reducers/enemies';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
	const store = createStore(
		combineReducers({
			auth: authReducer,
			cards: cardsReducer,
			enemies: enemiesReducer,
		}),
		composeEnhancers(applyMiddleware(thunk))
	);

	return store;
};
