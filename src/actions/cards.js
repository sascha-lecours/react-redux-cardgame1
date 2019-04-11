import uuid from 'uuid';
import shuffle from 'shuffle-array';
import { cardDefault } from '../gameData/cardList';

// CLEAR_HIGHLIGHT_CARD
export const clearHighlightCard = ({ id }) => {
	return {
		type: 'CLEAR_HIGHLIGHT_CARD',
		id,
	};
};

// DRAW_CARD
export const drawCard = () => {
	return {
		type: 'DRAW_CARD',
	};
};

// DISCARD_CARD
// Note: Discards from hand only. A different method will be needed to discard from deck or play.
export const discardCard = ({ id }) => {
	return {
		type: 'DISCARD_CARD',
		id,
	};
};

// DISCARD_HAND
export const discardHand = () => {
	return {
		type: 'DISCARD_HAND',
	};
};

// HIGHLIGHT_CARD
export const highlightCard = ({ id }) => {
	return {
		type: 'HIGHLIGHT_CARD',
		id,
	};
};

// HIGHLIGHT_CARD
export const highlighUnplayed = ({ id }) => {
	return {
		type: 'HIGHLIGHT_UNPLAYED',
		id,
	};
};

// INITIALIZE_PLAYER
export const initializePlayer = (player) => {
	return {
		type: 'INITIALIZE_PLAYER',
		player: {
			...player,
			id: uuid(),
		},
	};
};

// SET_HAND
export const setHand = (cards) => {
	const cardsWithIds = cards.slice(0).map((card) => {
		return { ...cardDefault, ...card, id: uuid.v4() };
	});
	return {
		type: 'SET_HAND',
		hand: cardsWithIds,
	};
};


// SET_DECK
export const setDeck = (cards) => {
	const cardsWithIds = cards.slice(0).map((card) => {
		return {
			...cardDefault,
			...card,
			id: uuid.v4(),
		};
	});
	const shuffledCards = shuffle(cardsWithIds);
	return {
		type: 'SET_DECK',
		deck: shuffledCards,
	};
};

// RESHUFFLE_DISCARDS

export const reshuffleDiscards = () => {
	return {
		type: 'RESHUFFLE_DISCARDS',
	};
};

// BANISH

export const banishCard = ({ id }) => {
	return {
		type: 'BANISH_CARD',
		id,
	};
};
