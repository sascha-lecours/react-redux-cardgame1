const quickStrikes = {
	type: 'attack',
	name: 'Quick Strikes',
	baseDamage: 2,
	varianceDamage: 0,
	numberOfHits: 3,
};

const bigStrike = {
	type: 'attack',
	name: 'Clonka Bonk',
	baseDamage: 7,
	varianceDamage: 3,
	numberOfHits: 1,
};

export const moveDefault = {
	type: undefined,
	name: undefined,
	baseDamage: 0,
	varianceDamage: 0,
	numberOfHits: 1,
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
	actions: [quickStrikes, quickStrikes, bigStrike],
};

export const testEnemy2 = {
	id: 'placeholder2',
	name: 'Big Beefo',
	maxHp: 20,
	defense: 5,
	actions: [quickStrikes, bigStrike, bigStrike],
};
