import uuid from 'uuid';


const defaultMove = {
	type: 'attack',
	name: 'Default Move',
	baseDamage: 1,
	varianceDamage: 0,
	numberOfHits: 1,
};

const defaultEnemy = {
	id: 'uninitialized',
	name: 'uninitialized',
	stats: {
		maxHp: 1,
		hp: 1,
		armour: 0,
		actions: [defaultMove],
	},
};

// SET_ENEMIES
export const setEnemies = (enemies) => {
	const initializedEnemies = enemies.slice(0).map((enemy) => ({
		...defaultEnemy,
		...enemy,
		id: uuid(),
		stats: {
			...enemy.stats,
			hp: enemy.stats.maxHp,
		},
		nextMove: {
			type: 'attack',
			name: 'Quick Strikes',
			baseDamage: 2,
			varianceDamage: 0,
			numberOfHits: 3,
		},
	}));
	return {
		type: 'SET_ENEMIES',
		enemies: initializedEnemies,
	};
};

// SET_NEW_MOVE

export const setNewMove = ({ id }) => {
	return {
		type: 'SET_NEW_MOVE',
		id,
	};
};