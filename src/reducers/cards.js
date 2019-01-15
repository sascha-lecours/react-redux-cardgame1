import { testCard1, testCard2 } from '../gameData/cardList';

// Cards Reducer

const cardsReducerDefaultState = {
	hand: [],
	deck: [],
	discard: [],
};

export default (state = cardsReducerDefaultState, action) => {
	switch (action.type) {
	case 'DISCARD_CARD': {
		const cardDiscarded = state.hand.slice().filter(({ id }) => id == action.id);
		const newHand = state.hand.slice().filter(({ id }) => id !== action.id);
		const newDiscard = state.discard.slice();
		newDiscard.unshift(cardDiscarded[0]);

		return {
			...state,
			hand: newHand,
			discard: newDiscard,
		};
	}
	case 'DRAW_CARD': {
		const deckCopy = state.deck.slice();
		const cardDrawn = deckCopy.shift();
		return {
			...state,
			deck: deckCopy,
			hand: [...state.hand, cardDrawn],
		};
	}
	case 'SET_DECK':
		return {
			...state,
			deck: action.deck,
		};
	case 'SET_HAND':
		return {
			...state,
			hand: action.hand,
		};
	default:
		return state;
	}
};
