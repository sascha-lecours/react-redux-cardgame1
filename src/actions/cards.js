import uuid from 'uuid';
import shuffle from 'shuffle-array';

// DRAW_CARD
export const drawCard = () => {
	return {
		type: 'DRAW_CARD',
	};
};

// PLAY_CARD

// DISCARD_CARD
// (Discards from hand only. A different method will be needed to discard from deck or play)
export const discardCard = ({ id }) => {
	console.log(`discard card ${id}`);
	return {
		type: 'DISCARD_CARD',
		id,
	};
};

// SET_HAND
export const setHand = (cards) => {
	const cardsWithIds = cards.slice(0).map((card) => ({...card, id: uuid()}));
	return {
		type: 'SET_HAND',
		hand: cardsWithIds,
	};
};


// SET_DECK
export const setDeck = (cards) => {
	const cardsWithIds = cards.slice(0).map((card) => ({...card, id: uuid()}));
	const shuffledCards = shuffle(cardsWithIds);
	return {
		type: 'SET_DECK',
		deck: shuffledCards,
	};
};

// RESHUFFLE_DISCARDS

// BANISH
