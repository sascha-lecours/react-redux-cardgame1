import { drawCard, discardCard } from '../actions/cards';
import targetRandomEnemy from './targetRandomEnemy';
import { store } from '../app';

// Action generators - these will be moved to the cards/actions folder later in development.
// Here for now for ease of reference.

// RAISE STRENGTH
export const raiseStrength = (target, strength) => {
	console.log(`Raising strength of ${target.name} by ${strength}`);
	return {
		type: 'RAISE_STRENGTH',
		target,
		strength,
	};
};

// RAISE MARKED
export const raiseMarked = (target, marked) => {
	console.log(`Marking ${target.name} for ${marked}`);
	return {
		type: 'RAISE_MARKED',
		target,
		marked,
	};
};

// RAISE TOUGHNESS
export const raiseToughness = (target, toughness) => {
	console.log(`Raising toughness of ${target.name} by ${toughness}`);
	return {
		type: 'RAISE_TOUGHNESS',
		target,
		toughness,
	};
};

// RAISE DEFENSE
export const raiseDefense = (target, defense) => {
	const modifiedDefense = Math.max((defense + target.toughness), 0);
	console.log(`Raising defense of ${target.name} by ${modifiedDefense}`);
	return {
		type: 'RAISE_DEFENSE',
		target,
		defense: modifiedDefense,
	};
};

// DEAL DAMAGE
// Currently invoked by the "make attack" function, which is called by card effects
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
	const modifiedDamage = baseDamage + source.strength;
	console.log(`${source.name} is attacking ${target.name} for ${modifiedDamage} damage, ${numberOfHits} times`);
	store.dispatch(dealDamage(target, source, modifiedDamage, numberOfHits));
};

// List of all cards in game

export const cardDefault = {
	id: null,
	name: '',
	attack: null,
	defense: null,
	strength: null,
	toughness: null,
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

export const testCard4 = {
	id: 'placeholder4',
	name: 'Berserk Rampage',
	type: 'Test',
	attack: 3,
	numberOfHits: 1,
	effects: [
		(player, card) => makeAttack(
			targetRandomEnemy(),
			player,
			card.attack,
			card.numberOfHits
		),
		(player, card) => makeAttack(
			targetRandomEnemy(),
			player,
			card.attack,
			card.numberOfHits
		),
		(player, card) => makeAttack(
			targetRandomEnemy(),
			player,
			card.attack,
			card.numberOfHits
		),
		(player, card) => store.dispatch(discardCard(card)),
	],
	specialText: 'Attack for 3 damage against 3 random targets',
};

export const testCard5 = {
	id: 'placeholder5',
	name: 'Get Swole',
	type: 'Test',
	strength: 1,
	effects: [
		(player, card) => store.dispatch(raiseStrength(player, card.strength)),
		(player, card) => store.dispatch(discardCard(card)),
	],
	specialText: 'Raise strength by 1',
};

export const testCard6 = {
	id: 'placeholder6',
	name: 'Sick tats',
	type: 'Test',
	toughness: 1,
	effects: [
		(player, card) => store.dispatch(raiseToughness(player, card.toughness)),
		(player, card) => store.dispatch(discardCard(card)),
	],
	specialText: 'Raise toughness by 1',
};

export const testCard7 = {
	id: 'placeholder7',
	name: 'Mark for Death',
	type: 'Test',
	marked: 3,
	effects: [
		(player, card) => store.dispatch(raiseMarked(targetRandomEnemy(), card.marked)),
		(player, card) => store.dispatch(discardCard(card)),
	],
	specialText: 'Mark target for 3 turns',
};

export const testCard8 = {
	id: 'placeholder8',
	name: 'Mega Buff',
	type: 'Test',
	toughness: 1,
	strength: 1,
	effects: [
		(player, card) => raiseToughness(player, card.strength),
		(player, card) => raiseStrength(player, card.strength),
		(player, card) => store.dispatch(discardCard(card)),
	],
	specialText: 'Raise strength by 2',
};
