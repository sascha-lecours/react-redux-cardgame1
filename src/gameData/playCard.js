// import { store } from '../app';

export default (player, card) =>
	card.effects.forEach(element => element(player, card));

