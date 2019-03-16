import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { reducer as modal } from 'redux-modal';
import authReducer from '../reducers/auth';
import gameReducer from '../reducers/game';
import turnReducer from '../reducers/turn';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
	const store = createStore(
		combineReducers({
			auth: authReducer,
			game: gameReducer,
			turn: turnReducer,
			modal,
		}),
		composeEnhancers(applyMiddleware(thunk))
	);

	return store;
};
