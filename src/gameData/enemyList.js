import { store } from '../app';
import { raiseDefense, raiseToughness, raiseStrength, raisePoison } from '../actions/combatEffects';
import { 
	delay,
	getCombatantById,
	makeAttack,
	attackOnce,
	makeDefend,
	defendOnce,
	startBuffAnimation,
	endBuffAnimation,
	applyPoison, 
	animatedAddCardToDeck
} from './helpers';
import {
	zomboHand
} from './cardList';
import targetPlayer from './targetPlayer';
import { clearAllCosmeticEffects } from '../actions/cosmeticBattleEffects';

// Animation constants and functions - possibly to be moved later
const pauseBeforePlayingCard = 100;
const pauseAfterBuffHighlight = 220;
const pauseAfterCardEffect = 220;
const pauseAfterPlayingCard = 450;

const pauseBeforeUnplayedCard = 100;
const pauseAfterUnplayedBuffHighlight = 220;
const pauseAfterUnplayedCardEffect = 120;


// // Helper functions
// const applyVariance = (base, variance) => {
// 	const modifier = Math.floor((Math.random() * ((variance * 2) + 1)) - variance);
// 	// console.log(`applying variance. Variance range is ${variance}, modifier is ${modifier}`);
// 	return (base + modifier);
// };

const quickStrikes = {
	type: 'attack',
	name: 'Quick Strikes',
	attack: 1,
	numberOfHits: 3,
	damageString: (enemy, move) => (`${move.numberOfHits} x ${move.attack + enemy.strength}`),
	effects: [
		async (enemy, move) => { 
			await attackOnce(targetPlayer(), enemy, move.attack);
			await attackOnce(targetPlayer(), enemy, move.attack); 
			await attackOnce(targetPlayer(), enemy, move.attack); 
		}
	],
};

const frenzy = {
	type: 'buff',
	name: 'Frenzy',
	strength: 1,
	defense: 3,
	effects: [
		async (enemy, move) => {
			await defendOnce(enemy, enemy, move.defense);
			await startBuffAnimation(enemy, enemy, move);
			store.dispatch(raiseStrength(getCombatantById(enemy.id), move.strength));
			await endBuffAnimation(getCombatantById(enemy.id), enemy, move);
			await delay(pauseAfterCardEffect);
			// await clearAllCosmeticEffects(enemy);
		},
		// async (enemy, move) => {return},
		// TDOD: Why is the next move starting before this one is fully finished? Could it be ebcause enemy movesets don't have a second 'card finished' element?
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

const poisonBite = {
	type: 'attack',
	name: 'Poison Chomp',
	poison: 4,
	effects: [
		async (enemy, move) => {
			applyPoison(targetPlayer(), enemy, move.poison);
		}
	],
};

const bullRush = {
	type: 'attack',
	name: 'Bull Rush',
	attack: 3,
	defense: 3,
	damageString: (enemy, move) => (`${move.attack + enemy.strength}`),
	effects: [
		async (enemy, move) => {
			await attackOnce(targetPlayer(), enemy, move.attack);
			await defendOnce(enemy, enemy, move.defense);
		},
	],
};

const warcry = {
	type: 'buff',
	name: 'Warcry',
	strength: 2,
	effects: [
		async (enemy, move) => store.dispatch(raiseStrength(enemy, move.strength)),
	],
};

const bigStrike = {
	type: 'attack',
	name: 'Clonka Bonk',
	attack: 7,
	numberOfHits: 1,
	damageString: (enemy, move) => (`${move.attack + enemy.strength}`),
	effects: [
		async (enemy, move) => {attackOnce(targetPlayer(), enemy, move.attack)},
	],
};

const bite = {
	type: 'attack',
	name: 'Bite',
	attack: 4,
	numberOfHits: 1,
	damageString: (enemy, move) => (`${move.attack + enemy.strength}`),
	effects: [
		async (enemy, move) => {attackOnce(targetPlayer(), enemy, move.attack)},
	],
};

const shamble = {
	type: 'attack',
	name: 'Shamble',
	attack: 3,
	defense: 3,
	damageString: (enemy, move) => (`${move.attack + enemy.strength}`),
	effects: [
		async (enemy, move) => {
			await attackOnce(targetPlayer(), enemy, move.attack);
			await defendOnce(enemy, enemy, move.defense);
		},
	],
};

const crawlCloser = {
	type: 'buff',
	name: 'Crawl Closer',
	defense: 2,
	strength: 1,
	effects: [
		async (enemy, move) => {
			await defendOnce(enemy, enemy, move.defense);
			await startBuffAnimation(enemy, enemy, move);
			store.dispatch(raiseStrength(getCombatantById(enemy.id), move.strength));
			await endBuffAnimation(getCombatantById(enemy.id), enemy, move);
			await delay(pauseAfterCardEffect);
		},
	],
};

const detachHand = {
	type: 'debuff',
	name: 'Lend a Hand',
	effects: [
		async (enemy, move) => {
			await animatedAddCardToDeck(zomboHand);
			await delay(pauseAfterCardEffect);
		},
	],
};

export const moveDefault = {
	type: undefined,
	name: undefined,
	baseDamage: 0,
	numberOfHits: 1,
	effects: [],
	damageString: (enemy, move) => (''),
};

// Enemy Stats

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
	poison: 0,
	maxPoison: 9999999999,
	minPoison: 0,
	keepDefenseThisTurn: false,
	keepDefensePermanent: false,
	actions: [quickStrikes, bigStrike],
	isActive: false,
	highlighted: false,
	shaking: false,
	buffing: false,
	gettingHit: false,
	portrait: '/images/enemies/snake.png',
};

export const lilSnek = {
	id: 'placeholder1',
	name: "Lil' Snek",
	portrait: '/images/enemies/snake.png',
	keepDefenseThisTurn: true,
	maxHp: 10,
	actions: [
		quickStrikes, 
		quickStrikes, 
		quickStrikes, 
		frenzy
	],
};

export const ogre = {
	name: 'Big Beefo',
	portrait: '/images/enemies/ogre.png',
	maxHp: 12,
	defense: 3,
	actions: [
		bigStrike, 
		bigStrike,
		bullRush,
		warcry
	],
};

export const zombie = {
	name: 'Zombo',
	portrait: '/images/enemies/shambling-zombie.png',
	maxHp: 13,
	actions: [
		bite,
		bite,
		detachHand,
		shamble,
		shamble,
	],
};

export const crawler = {
	name: 'Zombo Torso',
	portrait: '/images/enemies/half-body-crawling.png',
	maxHp: 7,
	actions: [
		detachHand,
		detachHand,
		detachHand,
		bite,
		crawlCloser,
	],
};

// Enemy Groups
