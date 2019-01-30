import * as _ from 'lodash';
import shuffle from 'shuffle-array';
import { testCard1, testCard2 } from '../gameData/cardList';

// Cards Reducer

const cardsReducerDefaultState = {
	hand: [],
	deck: [],
	discard: [],
	banished: [],
};

// Cards functions

const reshuffleDiscards = (state) => {
	const discardCopy = state.discard.slice();
	const discardShuffled = shuffle(discardCopy);
	const deckCopy = state.deck.slice();
	deckCopy.push(...discardShuffled);
	return {
		...state,
		deck: deckCopy,
		discard: [],
	};
};

// Reducer

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
		// DRAW_CARD will reshuffle the discard pile to make a new draw deck if necessary.
		if (!(state.deck.length) && !(state.discard.length)) {
			alert("Deck and discard pile both empty - cannot draw cards!");
			return state;
		}
		if (!(state.deck.length)) {
			const reshuffledState = reshuffleDiscards(state);
			const reshuffledcardDrawn = reshuffledState.deck.shift();
			return {
				...reshuffledState,
				deck: reshuffledState.deck,
				discard: [],
				hand: [...reshuffledState.hand, reshuffledcardDrawn],
			};
		}
		const deckCopy = state.deck.slice();
		const cardDrawn = deckCopy.shift();
		return {
			...state,
			deck: deckCopy,
			hand: [...state.hand, cardDrawn],
		};
	}
	case 'RESHUFFLE_DISCARDS': {
		return reshuffleDiscards(state);
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
	case 'BANISH_CARD': {
		const cardBanished = state.hand.slice().filter(({ id }) => id == action.id);
		const newHand = state.hand.slice().filter(({ id }) => id !== action.id);
		const newBanished = state.banished.slice();
		newBanished.unshift(cardBanished[0]);

		return {
			...state,
			hand: newHand,
			banished: newBanished,
		};
	}
	default:
		return state;
	}
};
