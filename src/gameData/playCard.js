import { store } from '../app';

// Helper function: pulls the latest version of the player and returns a copy
// TODO: if multiple players are added later, have it actually filter for them by ID
const getPlayerById = (id) => {
	return store.getState().game.playerGroup[0];
};


// Plays out effects of a card
export default ({ id }, card) =>
	card.effects.forEach(element => element(getPlayerById(id), card));

