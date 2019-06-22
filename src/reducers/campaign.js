const campaignDefaultState = {
	playerSave: null,
	deckSave: [],
	potentialCards1: [],
	potentialCards2: [],
	card1ToAdd: true,
	card2ToAdd: true,
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
		if (action.slot === 1) {
			return {
				...state,
				potentialCards1: action.potentialCards,
			};
		} else if (action.slot === 2) {
			return {
				...state,
				potentialCards2: action.potentialCards,
			};
		} else return state;
	case 'ADD_CARD_TO_CAMPAIGN_DECK': {
		const newDeck = state.deckSave.slice();
		newDeck.push(action.card);
		const card1ToAdd = (action.slot === 1) ? false : state.card1ToAdd;
		const card2ToAdd = (action.slot === 2) ? false : state.card2ToAdd;
		return {
			...state,
			deckSave: newDeck,
			card1ToAdd,
			card2ToAdd,
		};
	}
	default:
		return state;
	}
};
