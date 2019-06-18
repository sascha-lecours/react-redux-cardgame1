import uuid from 'uuid';
import { store } from '../app';
import { dealDamage, raiseDefense, raisePoison } from '../actions/combatEffects';
import { applyShaking, clearShaking, applyPulsing, clearPulsing } from '../actions/cosmeticBattleEffects';
import { playerDefault } from './playerList';
import { addToDiscard, addToDeck } from '../actions/cards';
import { cardDefault } from './cardList'; 


// The imports below are to generate cards to add to the deck - this may be moved later
import {
	tripleStrike,
	doubleShield,
	testCard3,
	wildStrikes,
	strengthBuff,
	toughBuff,
	attackMark,
	buffStrenghTough,
	poisonSplash,
	baseAttack,
	baseDefend,
	sweepAttack,
	poisonCloud,
	bodySlam,
	strengthIfMarked,
	toughnessMarked,
	defenseKeep,
	shieldBash,
	damageSelfAttack,
	poisonBlock,
	blockSecondaryPoison,
} from './cardList';

// Universal timing costants for animation

const pauseBeforeAttack = 300;
const durationhOfAttackShake = 130;

const pauseBeforeDefend = 250;
const durationhOfDefendPulse = 500;

const pauseBeforeBuff= 300;
const durationhOfBuffAnimation = 500;


export const delay = (time, callback) => {
	return new Promise((resolve) => {
		setTimeout(resolve.bind(null, callback), time);
	});
};

// Takes a combatant object's ID and retrieves the latest version of them.
export const getCombatantById = (id) => {
	const myState = store.getState();
	const allCombatants = myState.game.enemyGroup.concat(myState.game.playerGroup);

	const myTarget = allCombatants.filter((combatant) => {
		return (combatant.id === id);
	});
	if (myTarget.length) return myTarget[0];
	return null;
};

export const getEnemyGroup = () => {
	const myState = store.getState();
	const allEnemies = myState.game.enemyGroup;
	if (!allEnemies || allEnemies.length===0) return null;
	return allEnemies;
}

export const makeAttack = (target, source, baseDamage, numberOfHits) => {
	if (target && source) {
		const modifiedDamage = baseDamage + source.strength;
		console.log(`${source.name} is attacking ${target.name} (${target.hp} hp) for ${modifiedDamage} damage, ${numberOfHits} times`);
		store.dispatch(dealDamage(target, source, modifiedDamage, numberOfHits));
	} else {
		console.log('Attack cancelled - no valid target (or attacker no longer exists)!');
	}
};


export const makeDefend = (target, source, baseDefense) => {
	if (target && source) {
		const modifiedDefense = baseDefense + source.toughness;
		console.log(`${source.name} is defending ${target.name} (${target.defense} defense) for ${modifiedDefense} defense`);
		store.dispatch(raiseDefense(target, modifiedDefense));
	} else {
		console.log('Defense cancelled - no valid target (or defender no longer exists)!');
	}
}

export const attackOnce = async (target, source = playerDefault, attack) => {
	await delay(pauseBeforeAttack);
	if(!target) {
		console.log('target no longer exists!');
		return;
	}
	store.dispatch(applyShaking(target));
	await makeAttack(
		getCombatantById(target.id),
		source,
		attack,
		1
	);
	await delay(durationhOfAttackShake);
	store.dispatch(clearShaking(target));
};

export const defendOnce = async (target, source = playerDefault, defense) => {
	await delay(pauseBeforeDefend);
	store.dispatch(applyPulsing(target));
	await makeDefend(
		getCombatantById(target.id),
		source,
		defense,
	);
	await delay(durationhOfDefendPulse);
	store.dispatch(clearPulsing(target));
};

export const applyPoison = async (target, source = playerDefault, poison) => {
	await delay(pauseBeforeAttack);
	store.dispatch(applyShaking(target));
	if (target && source) {
		console.log(`${source.name} is poisoning ${target.name} for ${poison} poison`);
		store.dispatch(raisePoison(target, poison));
	} else {
		console.log('Poison cancelled - no valid target (or poisoner no longer exists)!');
	}
	await delay(durationhOfAttackShake);
	store.dispatch(clearShaking(target));
};

export const startBuffAnimation = async (target, source = playerDefault, card) => {
	await delay(pauseBeforeBuff);
	store.dispatch(applyPulsing(target));
};

export const endBuffAnimation = async (target, source = playerDefault, card) => {
	await delay(durationhOfBuffAnimation);
	store.dispatch(clearPulsing(target));
};

export const animatedAddCardToDiscard = async (card) => {
	await delay(pauseBeforeBuff);
	await store.dispatch(addToDiscard(card));
	await delay(durationhOfBuffAnimation);
};

export const animatedAddCardToDeck= async (card) => {
	await delay(pauseBeforeBuff);
	await store.dispatch(addToDeck(card));
	await delay(durationhOfBuffAnimation);
};

// This set of cards is for easy use when testing the below function.


// Returns a number of cards from a given set as an array. Will not contain duplicates (unless cardset does). Adds IDs to cards.
export const getNewCards = (number, cardset) => {
	const cardsWithIds = cardset.slice(0).map((card) => {
		return { ...cardDefault, ...card, id: uuid.v4() };
	});

	const arr = []
	while(arr.length < number){
    	const r = Math.floor(Math.random()*cardsWithIds.length) + 1;
    	if(arr.indexOf(r) === -1) arr.push(cardsWithIds[r]);
	}
	console.log(`First possible card is: ${arr[0].name}`);
	return arr;
};