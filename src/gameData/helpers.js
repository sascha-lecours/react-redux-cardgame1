import { store } from '../app';
import { dealDamage, raiseDefense } from '../actions/combatEffects';
import { applyShaking, clearShaking, applyPulsing, clearPulsing } from '../actions/cosmeticBattleEffects';

// universal timing costants for animation

const pauseBeforeAttack = 300;
const durationhOfAttackShake = 130;

const pauseBeforeDefend = 250;
const durationhOfDefendPulse = 500;


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

export const attackOnce = async (target, source, attack) => {
	await delay(pauseBeforeAttack);
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

export const defendOnce = async (target, source, defense) => {
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