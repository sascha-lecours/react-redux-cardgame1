import { store } from '../app';
import { makeAttack, raiseDefense, raiseToughness, raiseStrength } from './cardList';
import targetPlayer from './targetPlayer';


// Helper functions
const applyVariance = (base, variance) => {
	const modifier = Math.floor((Math.random() * ((variance * 2) + 1)) - variance);
	console.log(`applying variance. Variance range is ${variance}, modifier is ${modifier}`);
	return (base + modifier);
};

const quickStrikes = {
	type: 'attack',
	name: 'Quick Strikes',
	attack: 2,
	varianceDamage: 0,
	numberOfHits: 3,
	effects: [
		(enemy, move) => makeAttack(
			targetPlayer(),
			enemy,
			applyVariance(move.attack, move.varianceDamage),
			move.numberOfHits
		),
	],
};

const frenzy = {
	type: 'buff',
	name: 'Frenzy',
	strength: 1,
	defense: 3,
	attack: 1,
	numberOfHits: 1,
	effects: [
		(enemy, move) => store.dispatch(raiseDefense(enemy, move.defense)),
		(enemy, move) => store.dispatch(raiseStrength(enemy, move.strength)),
		(enemy, move) => makeAttack(
			targetPlayer(),
			enemy,
			applyVariance(move.attack, move.varianceDamage),
			move.numberOfHits
		),
	],
};

const crystallize = {
	type: 'defense',
	name: 'Crystallize',
	defense: 6,
	toughness: 1,
	effects: [
		(enemy, move) => store.dispatch(raiseDefense(enemy, move.defense)),
		(enemy, move) => store.dispatch(raiseToughness(enemy, move.toughness)),
	],
};

const warcry = {
	type: 'buff',
	name: 'Warcry',
	strength: 2,
	effects: [
		(enemy, move) => store.dispatch(raiseStrength(enemy, move.strength)),
	],
};

const bigStrike = {
	type: 'attack',
	name: 'Clonka Bonk',
	attack: 7,
	varianceDamage: 3,
	numberOfHits: 1,
	effects: [
		(enemy, move) => makeAttack(
			targetPlayer(),
			enemy,
			applyVariance(move.attack, move.varianceDamage),
			move.numberOfHits
		),
	],
};

export const moveDefault = {
	type: undefined,
	name: undefined,
	baseDamage: 0,
	varianceDamage: 0,
	numberOfHits: 1,
	effects: [],
};

export const enemyDefault = {
	id: undefined,
	name: undefined,
	maxHp: 1,
	defense: 0,
	maxDefense: 999,
	minDefense: 0,
	strength: 0,
	maxStrength: 999,
	minStrength: -999,
	toughness: 0,
	maxToughness: 999,
	minToughness: -999,
	marked: 0,
	maxMarked: 999,
	minMarked: 0,
	actions: [quickStrikes, bigStrike],
};

export const testEnemy1 = {
	id: 'placeholder1',
	name: "Lil' Gobster",
	maxHp: 10,
	defense: 0,
	actions: [quickStrikes, quickStrikes, frenzy],
};

export const testEnemy2 = {
	id: 'placeholder2',
	name: 'Big Beefo',
	maxHp: 20,
	defense: 5,
	actions: [quickStrikes, warcry, bigStrike, bigStrike],
};
