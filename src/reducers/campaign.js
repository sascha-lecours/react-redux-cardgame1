const campaignDefaultState = {
	playerSave: null,
	deckSave: [],
	potentialCards: [],
};

export default (state = campaignDefaultState, action) => {

	switch (action.type) {
	case 'CAMPAIGN_SETUP':
		return {
			...state,
			playerSave: action.savedPlayer,
			deckSave: action.savedDeck,
		};

	case 'SAVE_PLAYER':
		return {
			...state,
			playerSave: action.savedPlayer,
			deckSave: action.savedDeck,
		};
	case 'SET_POTENTIAL_NEW_CARDS':
		return {
			...state,
			potentialCards: action.potentialCards,
		};
	case 'ADD_CARD_TO_CAMPAIGN_DECK': {
		const newDeck = state.deckSave.slice();
		newDeck.push(action.card);
		return {
			...state,
			deckSave: newDeck,
		};
	}
	default:
		return state;
	}
};
