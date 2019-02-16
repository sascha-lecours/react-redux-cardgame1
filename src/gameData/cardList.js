import { drawCard, discardCard } from '../actions/cards';
import targetRandomEnemy from './targetRandomEnemy';
import { store } from '../app';

// Action generators - these will be moved to the cards/actions folder later in development.
// Here for now for ease of reference.

export const raiseDefense = (target, defense) => {
	console.log(`Raising defense of ${target.name} by ${defense}`);
	return {
		type: 'RAISE_DEFENSE',
		target,
		defense,
	};
};


export const dealDamage = (target, source, damage, numberOfHits) => {
	return {
		type: 'DEAL_DAMAGE',
		target,
		source,
		damage,
		numberOfHits,
	};
};

// Helper functions - probably to be moved to another file later.

// This function will need the store to be imported!
export const makeAttack = (target, source, baseDamage, numberOfHits) => {
	const adjustedDamage = baseDamage + source.strength;
	console.log(`Attacking target: ${target.name}`);
	store.dispatch(dealDamage(target, source, adjustedDamage, numberOfHits));
};

// List of all cards in game

export const cardDefault = {
	id: null,
	name: '',
	attack: null,
	defense: null,
	numberOfHits: 1,
	portrait: null,
	specialText: null,
	flavourText: null,
	effects: [],
};

export const testCard1 = {
	id: 'placeholder1',
	name: 'Test Card 1',
	type: 'Test',
	attack: 3,
	defense: 2,
	numberOfHits: 2,
	specialText: 'Attacks twice when played.',
	flavourText: "Sometimes you just need to see if it's working",
	effects: [
		(player, card) => makeAttack(
			targetRandomEnemy(),
			player,
			card.attack,
			card.numberOfHits
		),

		(player, card) => store.dispatch(raiseDefense(player, card.defense)),
		(player, card) => store.dispatch(discardCard(card)),
	],
};


export const testCard2 = {
	id: 'placeholder2',
	name: 'Defensive stance',
	type: 'Test',
	defense: 10,
	effects: [
		(player, card) => store.dispatch(raiseDefense(player, card.defense)),
		(player, card) => store.dispatch(discardCard(card)),
	],
};

export const testCard3 = {
	id: 'placeholder3',
	name: 'Test Draw Card',
	type: 'Test',
	effects: [
		() => store.dispatch(drawCard()),
		() => store.dispatch(drawCard()),
		(player, card) => store.dispatch(discardCard(card)),
	],
	specialText: 'Draw 2 cards',
};

