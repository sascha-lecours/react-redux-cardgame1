// SAVE_PLAYER
export const savePlayer = (savedPlayer) => {
	return {
		type: 'SAVE_PLAYER',
		savedPlayer,
	};
};