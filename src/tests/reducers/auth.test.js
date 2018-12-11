import authReducer from '../../reducers/auth';

test('should set default state', () => {
	const state = authReducer(undefined, { type: '@@INIT' });
	expect(state).toEqual({ });
});

test('should handle login action and pass uid', () => {
	const uid = 'myUID';
	const state = authReducer(undefined, { type: 'LOGIN', uid });
	expect(state.uid).toEqual(uid);
});

test('clear uid for logout', () => {
	const currentState = { uid: 'someUID' };
	const state = authReducer(currentState, { type: 'LOGOUT' });
	expect(state).toEqual({ });
});
