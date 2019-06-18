const campaignDefaultState = {
	playerSave: null,
	deckSave: [],
	potentialCards: [],
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
	case 'SET_POTENTIAL_NEW_CARDS':
		return {
			potentialCards: action.potentialCards,
		};
	default:
		return state;
	}
};
