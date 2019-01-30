// Enemy Reducer

const enemyReducerDefaultState = {
	enemyGroup: [],
};

// Enemy Reducer functions


// Right now this just sets it to their first move. Add randomizer later.
const pickMove = (enemy) => {
	return enemy.stats.actions[Math.floor(Math.random() * enemy.stats.actions.length)];
};

// Reducer

export default (state = enemyReducerDefaultState, action) => {
	switch (action.type) {
	case 'SET_ENEMIES':
		return {
			...state,
			enemyGroup: action.enemies,
		};
	case 'SET_NEW_MOVE':
		return {
			...state,
			enemyGroup: state.enemyGroup.map((enemy) => {
				if (enemy.id === action.id) {
					return {
						...enemy,
						nextMove: pickMove(enemy),
					};
				} else {
					return enemy;
				}
			}),
		};
	default:
		return state;
	}
};
