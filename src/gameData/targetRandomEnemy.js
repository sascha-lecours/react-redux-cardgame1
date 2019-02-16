import { store } from '../app';

// Returns a copy of a randomly-selected enemy from the list of all enemies, passed as a prop.

// TODO: Make sure dead enemies are excluded from the choice.
// TODO: check for focus-fire effect that overrides the random choice
// TODO: consider refactoring so only the ID or index is passed?

export default () => {
	const { enemyGroup } = store.getState().game;
	return enemyGroup[Math.floor(Math.random() * enemyGroup.length)];
};
