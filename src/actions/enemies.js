import uuid from 'uuid';
import { enemyDefault, moveDefault } from '../gameData/enemyList';

// SET_ENEMIES
export const setEnemies = (enemies) => {
	const initializedEnemies = enemies.slice(0).map((enemy) => ({
		...enemyDefault,
		...enemy,
		id: uuid(),
		stats: {
			...enemy.stats,
			hp: enemy.stats.maxHp,
		},
		nextMove: {
			moveDefault,
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