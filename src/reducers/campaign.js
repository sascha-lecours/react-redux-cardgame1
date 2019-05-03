const campaignDefaultState = {
	playerSave: null,
};

export default (state = campaignDefaultState, action) => {

	switch (action.type) {
	case 'SAVE_PLAYER':
		return {
			playerSave: action.savedPlayer,
		};
	default:
		return state;
	}
};
