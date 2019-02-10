import { drawCard, discardCard } from '../actions/cards';

// Action generators - these will be moved to the cards/actions folder later in development. 
// Here for now for ease of reference.

export const raiseDefense = (defense) => {
	return {
		type: 'RAISE_DEFENSE',
		defense,
	};
};

// List of all cards in game

export const cardDefault = {
	id: null,
	name: '',
	stats: {
		attack: null,
		defense: null,
	},
	portrait: null,
	specialText: null,
	flavourText: null,
	effects: [],
};

export const testCard1 = {
	id: 'placeholder1',
	name: 'Test Card 1',
	type: 'Test',
	stats: {
		attack: 1,
		defense: 2,
	},
	specialText: 'When played, this card does absolutely nothing special',
	flavourText: "Sometimes you just need to see if it's working",
};


export const testCard2 = {
	id: 'placeholder2',
	name: 'Other Test Card',
	type: 'Test',
	stats: {
		defense: 200,
	},
	effects: [
		card => raiseDefense(card.stats.defense),
	]
};

export const testCard3 = {
	id: 'placeholder3',
	name: 'Test Draw Card',
	type: 'Test',
	effects: [
		() => drawCard(),
		() => drawCard(),
		card => discardCard(card),
	],
	specialText: 'Draw 2 cards',
};


