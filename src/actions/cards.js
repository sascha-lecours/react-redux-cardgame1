import uuid from 'uuid';
import shuffle from 'shuffle-array';
import { cardDefault } from '../gameData/cardList';

// DRAW_CARD
export const drawCard = () => {
	return {
		type: 'DRAW_CARD',
	};
};

// PLAY_CARD

// DISCARD_CARD
// Note: Discards from hand only. A different method will be needed to discard from deck or play.
export const discardCard = ({ id }) => {
	console.log(`discard card ${id}`);
	return {
		type: 'DISCARD_CARD',
		id,
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
		return { ...cardDefault, ...card, id: uuid.v4() };
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
	console.log(`banish card ${id}`);
	return {
		type: 'BANISH_CARD',
		id,
	};
};
