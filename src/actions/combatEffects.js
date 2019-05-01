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
	if (marked > 0)console.log(`Marking ${target.name} for ${marked}`);
	return {
		type: 'RAISE_MARKED',
		target,
		marked,
	};
};

// RAISE POISON
export const raisePoison = (target, poison) => {
	// if (poison > 0) console.log(`Poisoning ${target.name} for ${poison}`);
	return {
		type: 'RAISE_POISON',
		target,
		poison,
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
	// const modifiedDefense = Math.max((defense + target.toughness), 0);
	// console.log(`Raising defense of ${target.name} by ${modifiedDefense}`);
	return {
		type: 'RAISE_DEFENSE',
		target,
		defense,
	};
};

// CLEAR DEFENSE
export const clearDefense = (target) => {
	return {
		type: 'CLEAR_DEFENSE',
		target,
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
