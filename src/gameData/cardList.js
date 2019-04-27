import { drawCard, discardCard, banishCard, clearHighlightCard, } from '../actions/cards';
import { raiseStrength, raiseMarked, raiseToughness, raiseDefense, raisePoison, dealDamage } from '../actions/combatEffects';
import targetRandomEnemy from './targetRandomEnemy';
import { store } from '../app';
import { delay, getCombatantById, makeAttack, attackOnce, makeDefend, defendOnce } from './helpers';
import { applyHighlight, applyShaking, clearShaking, clearAllCosmeticEffects } from '../actions/cosmeticBattleEffects';

// Animation constants and functions - possibly to be moved later
const pauseBeforePlayingCard = 100;
const pauseAfterBuffHighlight = 220;
const pauseAfterCardEffect = 220;
const pauseAfterPlayingCard = 450;

const pauseBeforeUnplayedCard = 100;
const pauseAfterUnplayedBuffHighlight = 220;
const pauseAfterUnplayedCardEffect = 120;


// helper function used to un-highlight and then discard a card

const cardFinished = (card) => {
	store.dispatch(clearHighlightCard(card));
	store.dispatch(discardCard(card));
};


// List of all cards in game

export const cardDefault = {
	id: null,
	name: '',
	type: undefined,
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
	unplayedAttack: null,
	unplayedDefense: null,
	unplayedSpecialText: null,
	unplayedEffects: [],
	highlighted: false,
	highlightUnplayed: false,
};

export const testCard1 = {
	name: 'Spear Jabs',
	type: 'Attack',
	attack: 1,
	defense: 3,
	numberOfHits: 1,
	specialText: (player) => {return `Attack for ${1 + player.strength} damage, 3 times`},
	effects: [
		async (player, card) => {
			const target = targetRandomEnemy();
			await delay(pauseBeforePlayingCard);
			store.dispatch(applyHighlight(target));
			await attackOnce(target, player, card.attack);
			await attackOnce(target, player, card.attack);
			await attackOnce(target, player, card.attack);
			await delay(pauseAfterCardEffect);
			store.dispatch(clearAllCosmeticEffects(target));
		},
		async (player, card) => cardFinished(card),
	],
	unplayedEffects: [
		async (player, card) => {
			const target = player;
			await delay(pauseBeforeUnplayedCard);
			store.dispatch(applyHighlight(player));
			await delay(pauseAfterUnplayedBuffHighlight);
			await defendOnce(target, player, card.defense);
			await delay(pauseAfterUnplayedCardEffect);
		}
	],
	unplayedSpecialText: (player) => {return `Defend for ${3 + player.toughness}`},
};


export const testCard2 = {
	id: 'placeholder2',
	name: 'Defensive stance',
	type: 'Test',
	defense: 10,
	specialText: 'Gain 10 defense 2 times.',
	flavourText: "Time to hunker down",
	effects: [
		async (player, card) => {
			const target = player;
			await delay(pauseBeforePlayingCard);
			store.dispatch(applyHighlight(target));
			await defendOnce(target, player, card.defense);
			await defendOnce(target, player, card.defense);
			await delay(pauseAfterCardEffect);
			store.dispatch(clearAllCosmeticEffects(target));
		},
		async (player, card) => cardFinished(card),
	],
};

export const testCard3 = {
	id: 'placeholder3',
	name: 'Test Draw Card',
	type: 'Test',
	effects: [
		() => store.dispatch(drawCard()),
		() => store.dispatch(drawCard()),
		async (player, card) => cardFinished(card),
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
		async (player, card) => cardFinished(card),
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
		async (player, card) => cardFinished(card),
	],
	specialText: 'Poison enemy for 5',
};
