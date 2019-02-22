import { store } from '../app';

// Returns a copy of a random player, unless one is marked

export default () => {
	const { playerGroup } = store.getState().game;
	const markedPlayer = playerGroup.slice().filter(({ marked }) => marked > 0);

	// If a player is marked, always return that one. If not, choose a random one.
	if (markedPlayer.length === 0) {
		return playerGroup[Math.floor(Math.random() * playerGroup.length)];
	} else {
		return markedPlayer[0];
	}
};
