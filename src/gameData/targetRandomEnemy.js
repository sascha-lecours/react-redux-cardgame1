import { store } from '../app';

// Returns a copy of a randomly-selected enemy from the list of all enemies, passed as a prop.

// TODO: Make sure dead enemies are excluded from the choice. -> exclude enemies at 0 (or less) hp?
// TODO: consider refactoring so only the ID or index is passed rather than a full copy?

export default () => {
	const { enemyGroup } = store.getState().game;
	const livingTargets = enemyGroup.slice().filter(({ hp }) => hp > 0);
	const markedEnemy = livingTargets.slice().filter(({ marked }) => marked > 0);

	// If an enemy is marked, always return that one. If not, choose a random one.
	if (livingTargets.length === 0) {
		console.log('No valid targets left above 0 hp!')
		return undefined;
	} else if (markedEnemy.length === 0) {
		return enemyGroup[Math.floor(Math.random() * enemyGroup.length)];
	} else {
		return markedEnemy[0];
	}
};
