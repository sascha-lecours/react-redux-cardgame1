import { store } from '../app';

export default (player, card) => {
	card.effects.forEach(element => {
		store.dispatch(element(player, card));
	});
};
