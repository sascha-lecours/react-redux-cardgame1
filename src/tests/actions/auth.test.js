import {
	login,
	logout,
} from '../../actions/auth';


test('should return login action', () => {
	const uid = 'myUID';
	const action = login(uid);

	expect(action).toEqual({
		type: 'LOGIN',
		uid,
	});
});


test('should return logout action', () => {
	const action = logout();

	expect(action).toEqual({
		type: 'LOGOUT',
	});
});

