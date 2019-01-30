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

export const testEnemy1 = {
	id: 'placeholder1',
	name: "Lil' Gobster",
	stats: {
		maxHp: 10,
		armour: 0,
		actions: [quickStrikes, quickStrikes, bigStrike],
	},
};

export const testEnemy2 = {
	id: 'placeholder2',
	name: 'Big Beefo',
	stats: {
		maxHp: 20,
		armour: 1,
		actions: [quickStrikes, bigStrike, bigStrike],
	},
};