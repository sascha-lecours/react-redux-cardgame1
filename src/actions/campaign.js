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

// SET_POTENTIAL_NEW_CARDS
export const setPotentialNewCards = (number, cardset, slot) => {
	const cardsWithIds = cardset.slice(0).map((card) => {
		return {
			...cardDefault,
			...card,
			id: uuid.v4(),
		};
	});

	const arr = [];
	const usedNums = [];
	while (arr.length < number) {
		const r = Math.floor(Math.random() * cardsWithIds.length)/* + 1 */;
		if (usedNums.indexOf(r) === -1) {
			arr.push(cardsWithIds[r]);
			usedNums.push(r);
		}
	}

	return {
		type: 'SET_POTENTIAL_NEW_CARDS',
		potentialCards: arr,
		slot,
	};
};

// ADD_CARD_TO_CAMPAIGN_DECK
export const addCardToCampaignDeck = (card, slot) => {
	return {
		type: 'ADD_CARD_TO_CAMPAIGN_DECK',
		card,
		slot,
	};
};

// ADVANCE_CAMPAIGN
export const advanceCampaign = () => {
	return {
		type: 'ADVANCE_CAMPAIGN',
	};
};
