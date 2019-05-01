import { store } from '../app';


const getEnemyById = (targetId) => {
	return store.getState().game.enemyGroup.filter(({ id }) => id === targetId)[0];
};


export default async ({ id }, move) => {
	console.log(`Enemy used ${move.name}`);
	for (const element of move.effects) {
		await element(getEnemyById(id), move);
	};
};

