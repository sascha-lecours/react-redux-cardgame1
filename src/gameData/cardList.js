import { drawCard, discardCard, banishCard } from '../actions/cards';
import { raiseStrength, raiseMarked, raiseToughness, raiseDefense, raisePoison, dealDamage } from '../actions/combatEffects';
import targetRandomEnemy from './targetRandomEnemy';
import { store } from '../app';
import { delay, getCombatantById, makeAttack, attackOnce } from './helpers';
import { applyHighlight, applyShaking, clearShaking, clearAllCosmeticEffects } from '../actions/cosmeticBattleEffects';

// Animation constants and functions - possibly to be moved later
const pauseBeforePlayingCard = 100;

// List of all cards in game

export const cardDefault = {
	id: null,
	name: '',
	attack: null,
	defense: null,
	strength: null,
	toughness: null,
	poison: null,
	numberOfHits: 1,
	portrait: null,
	specialText: null,
	flavourText: null,
	effects: [],
};

export const testCard1 = {
	id: 'placeholder1',
	name: 'Triple Threat',
	type: 'Test',
	attack: 3,
	defense: 3,
	numberOfHits: 1,
	specialText: 'Attack for 3, defend for 3.',
	flavourText: "Sometimes you just need to see if it's working",
	effects: [
		async (player, card) => {
			const target = targetRandomEnemy();
			await delay(pauseBeforePlayingCard);
			store.dispatch(applyHighlight(target));
			await attackOnce(target, player, card.attack);
			await attackOnce(target, player, card.attack);
			await attackOnce(target, player, card.attack);
			store.dispatch(clearAllCosmeticEffects(target));
		},
		(player, card) => store.dispatch(raiseDefense(player, card.defense)),
		(player, card) => store.dispatch(discardCard(card)),
	],
};


export const testCard2 = {
	id: 'placeholder2',
	name: 'Defensive stance',
	type: 'Test',
	defense: 10,
	specialText: 'Gain 10 defense 2 times.',
	flavourText: "Time to hunker down",
	effects: [
		(player, card) => store.dispatch(raiseDefense(player, card.defense)),
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
	strength: 2,
	effects: [
		(player, card) => store.dispatch(raiseStrength(player, card.strength)),
		(player, card) => store.dispatch(banishCard(card)),
	],
	specialText: 'Raise strength by 2. Banished when played.',
};

export const testCard6 = {
	id: 'placeholder6',
	name: 'Sick tats',
	type: 'Test',
	toughness: 3,
	effects: [
		(player, card) => store.dispatch(raiseToughness(player, card.toughness)),
		(player, card) => store.dispatch(banishCard(card)),
	],
	specialText: 'Raise toughness by 3. Banished when played.',
};

export const testCard7 = {
	id: 'placeholder7',
	name: 'Mark for Death',
	type: 'Test',
	marked: 5,
	effects: [
		(player, card) => store.dispatch(raiseMarked(targetRandomEnemy(), card.marked)),
		(player, card) => store.dispatch(banishCard(card)),
	],
	specialText: 'Mark target for 4 turns. Banished when played.',
};

export const testCard8 = {
	id: 'placeholder8',
	name: 'Mega Buff',
	type: 'Test',
	toughness: 1,
	strength: 1,
	defense: 5,
	effects: [
		(player, card) => store.dispatch(raiseDefense(player, card.defense)),
		(player, card) => store.dispatch(raiseToughness(player, card.toughness)),
		(player, card) => store.dispatch(raiseStrength(player, card.strength)),
		(player, card) => store.dispatch(raisePoison(player, -9999999999999)),
		(player, card) => store.dispatch(discardCard(card)),
	],
	specialText: 'Gain 5 defense, raise strength by 1 and raise toughness by 1. Also cures poisoning.',
};

export const testCard9 = {
	id: 'placeholder9',
	name: 'Poison Splash',
	type: 'Test',
	poison: 5,
	effects: [
		(player, card) => store.dispatch(raisePoison(targetRandomEnemy(), card.poison)),
		(player, card) => store.dispatch(discardCard(card)),
	],
	specialText: 'Poison enemy for 5',
};
