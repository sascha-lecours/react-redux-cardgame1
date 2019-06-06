const campaignDefaultState = {
	playerSave: null,
	deckSave: [],
};

export default (state = campaignDefaultState, action) => {

	switch (action.type) {
	case 'CAMPAIGN_SETUP':
		return {
			playerSave: action.savedPlayer,
			deckSave: action.savedDeck,
		};

	case 'SAVE_PLAYER':
		return {
			playerSave: action.savedPlayer,
			deckSave: action.savedDeck,
		};
	default:
		return state;
	}
};
