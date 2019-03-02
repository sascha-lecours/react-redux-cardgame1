const turnReducerDefaultState = {
	phase: 0,
};

export default (state = turnReducerDefaultState, action) => {

	switch (action.type) {
	case 'ADVANCE_PHASE':
		return {
			phase: (state.phase + 1),
		};
	default:
		return state;
	}
};
