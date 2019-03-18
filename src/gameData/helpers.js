import { store } from '../app';
import { dealDamage } from '../actions/combatEffects';

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