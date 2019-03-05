import uuid from 'uuid';
import { enemyDefault, moveDefault } from '../gameData/enemyList';

// SET_ENEMIES
export const setEnemies = (enemies) => {
	const initializedEnemies = enemies.slice(0).map((enemy) => ({
		...enemyDefault,
		...enemy,
		id: uuid(),
		hp: enemy.maxHp,
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

// KILL_ENEMY

export const killEnemy = ({ id }) => {
	return {
		type: 'KILL_ENEMY',
		id,
	};
};
