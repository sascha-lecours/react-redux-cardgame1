import { playerDefault } from '../gameData/playerList';

const campaignDefaultState = {
	playerSave: playerDefault,
};

export default (state = campaignDefaultState, action) => {

	switch (action.type) {
	case 'SAVE_PLAYER':
		return {
			playerSave: action.player,
		};
	default:
		return state;
	}
};
