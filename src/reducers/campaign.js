import {
	tripleStrike,
	doubleShield,
	wildStrikes,
	strengthBuff,
	toughBuff,
	attackMark,
	buffStrenghTough,
	poisonSplash,
	baseAttack,
	baseDefend,
	sweepAttack,
	poisonCloud,
	bodySlam,
	strengthIfMarked,
	toughnessMarked,
	defenseKeep,
	shieldBash,
	damageSelfAttack,
	poisonBlock,
	blockSecondaryPoison,
} from '../gameData/cardList';
import { warrior } from '../gameData/playerList';

const starterDeck = [
	baseAttack,
	baseAttack,
	baseDefend,
	baseDefend,
	tripleStrike,
	tripleStrike,
	doubleShield,
	doubleShield,
	wildStrikes,
	sweepAttack,
	strengthBuff,
	poisonCloud,
	toughBuff,
	attackMark,
	buffStrenghTough,
	poisonSplash,
	bodySlam,
	strengthIfMarked,
	defenseKeep,
	shieldBash,
	damageSelfAttack,
	poisonBlock,
	blockSecondaryPoison,
	toughnessMarked,
];

// These constants determine how many levels the game will contain in total,
// ...and how many encounters will be drawn from the 'easy' pool at the start.
const defaultTotalLevels = 5;
const defaultEasyLevels = 2;

const campaignDefaultState = {
	playerSave: warrior,
	deckSave: starterDeck,
	potentialCards1: [],
	potentialCards2: [],
	card1ToAdd: true,
	card2ToAdd: true,
	currentLevel: 0,
	totalLevels: defaultTotalLevels,
	easyLevels: defaultEasyLevels,
};

export default (state = campaignDefaultState, action) => {

	switch (action.type) {
	case 'CAMPAIGN_SETUP':
		return {
			...state,
			playerSave: action.savedPlayer,
			deckSave: action.savedDeck,
			currentLevel: 0,
			totalLevels: action.totalLevels,
			easyLevels: action.easyLevels,
		};

	case 'SAVE_PLAYER':
		return {
			...state,
			playerSave: action.savedPlayer,
			deckSave: action.savedDeck,
		};
	case 'SET_POTENTIAL_NEW_CARDS':
		if (action.slot === 1) {
			return {
				...state,
				potentialCards1: action.potentialCards,
			};
		} else if (action.slot === 2) {
			return {
				...state,
				potentialCards2: action.potentialCards,
			};
		} else return state;
	case 'ADD_CARD_TO_CAMPAIGN_DECK': {
		const newDeck = state.deckSave.slice();
		newDeck.push(action.card);
		const card1ToAdd = (action.slot === 1) ? false : state.card1ToAdd;
		const card2ToAdd = (action.slot === 2) ? false : state.card2ToAdd;
		return {
			...state,
			deckSave: newDeck,
			card1ToAdd,
			card2ToAdd,
		};
	}
	case 'ADVANCE_CAMPAIGN': {
		const newLevel = (state.currentLevel + 1);
		return {
			...state,
			currentLevel: newLevel,
			card1ToAdd: true,
			card2ToAdd: true,
		};
	}
	default:
		return state;
	}
};
