import uuid from 'uuid';
import shuffle from 'shuffle-array';
import { cardDefault } from '../gameData/cardList';

// SAVE_PLAYER
export const savePlayer = (savedPlayer, savedDeck) => {
	return {
		type: 'SAVE_PLAYER',
		savedPlayer,
		savedDeck,
	};
};

// CAMPAIGN_SETUP
export const campaignSetup = (player, cards) => {
	const cardsWithIds = cards.slice(0).map((card) => {
		return {
			...cardDefault,
			...card,
			id: uuid.v4(),
		};
	});
	const shuffledCards = shuffle(cardsWithIds);
	return {
		type: 'CAMPAIGN_SETUP',
		savedPlayer: {
			...player,
			id: uuid(),
		},
		savedDeck: shuffledCards,
	};
};
