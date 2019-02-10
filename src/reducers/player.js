import { playerDefault } from '../gameData/playerList';

// Player Reducer

const playerReducerDefaultState = {
	...playerDefault,
};


// Reducer

export default (state = playerReducerDefaultState, action) => {
	switch (action.type) {

	default:
		return state;
	}
};
