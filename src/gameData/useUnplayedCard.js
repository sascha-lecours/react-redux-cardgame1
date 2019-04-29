import { store } from '../app';
import { highlightUnplayed } from '../actions/cards';

// Helper function: pulls the latest version of the player and returns a copy
// TODO: if multiple players are added later, have it actually filter for them by ID
const getPlayerById = (id) => {
	return store.getState().game.playerGroup[0];
};


// Plays out effects of a card
export default async ({ id }, card) => {
	store.dispatch(highlightUnplayed(card));
	for (const element of card.unplayedEffects) {
		await element(getPlayerById(id), card)
	};
}