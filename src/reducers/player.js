import { playerDefault, warrior } from '../gameData/playerList';

// Player Reducer

const playerReducerDefaultState = {
	...playerDefault,
};


// Reducer

export default (state = playerReducerDefaultState, action) => {
	switch (action.type) {
	case 'INITIALIZE_PLAYER':
		return {
			...state,
			...action.player,
			hp: action.player.maxHp,
		};
	default:
		return state;
	}
};
