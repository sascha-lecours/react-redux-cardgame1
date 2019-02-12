import * as _ from 'lodash';
import shuffle from 'shuffle-array';
import { playerDefault } from '../gameData/playerList';

// Overall Combat Gam Reducer

const gameReducerDefaultState = {
	hand: [],
	deck: [],
	discard: [],
	banished: [],
	player: { ...playerDefault },
	enemyGroup: [],
};

// Cards functions

const reshuffleDiscards = (state) => {
	const discardCopy = state.discard.slice();
	const discardShuffled = shuffle(discardCopy);
	const deckCopy = state.deck.slice();
	deckCopy.push(...discardShuffled);
	return {
		...state,
		deck: deckCopy,
		discard: [],
	};
};

// Enemy functions

const pickMove = (enemy) => {
	return enemy.actions[Math.floor(Math.random() * enemy.actions.length)];
};


// Reducer

export default (state = gameReducerDefaultState, action) => {
	switch (action.type) {
	case 'INITIALIZE_PLAYER':
		return {
			...state,
			player: {
				...state.player,
				...action.player,
				hp: action.player.maxHp,
			},
		};
	case 'SET_ENEMIES':
		return {
			...state,
			enemyGroup: action.enemies,
		};
	case 'SET_NEW_MOVE':
		return {
			...state,
			enemyGroup: state.enemyGroup.map((enemy) => {
				if (enemy.id === action.id) {
					return {
						...enemy,
						nextMove: pickMove(enemy),
					};
				} else {
					return enemy;
				}
			}),
		};
	case 'DISCARD_CARD': {
		const cardDiscarded = state.hand.slice().filter(({ id }) => id == action.id);
		const newHand = state.hand.slice().filter(({ id }) => id !== action.id);
		const newDiscard = state.discard.slice();
		newDiscard.unshift(cardDiscarded[0]);

		return {
			...state,
			hand: newHand,
			discard: newDiscard,
		};
	}
	case 'DRAW_CARD': {
		// DRAW_CARD will reshuffle the discard pile to make a new draw deck if necessary.
		if (!(state.deck.length) && !(state.discard.length)) {
			alert("Deck and discard pile both empty - cannot draw cards!");
			return state;
		}
		if (!(state.deck.length)) {
			const reshuffledState = reshuffleDiscards(state);
			const reshuffledcardDrawn = reshuffledState.deck.shift();
			return {
				...reshuffledState,
				deck: reshuffledState.deck,
				discard: [],
				hand: [...reshuffledState.hand, reshuffledcardDrawn],
			};
		}
		const deckCopy = state.deck.slice();
		const cardDrawn = deckCopy.shift();
		return {
			...state,
			deck: deckCopy,
			hand: [...state.hand, cardDrawn],
		};
	}
	case 'RESHUFFLE_DISCARDS': {
		return reshuffleDiscards(state);
	}
	case 'SET_DECK':
		return {
			...state,
			deck: action.deck,
		};
	case 'SET_HAND':
		return {
			...state,
			hand: action.hand,
		};
	case 'BANISH_CARD': {
		const cardBanished = state.hand.slice().filter(({ id }) => id == action.id);
		const newHand = state.hand.slice().filter(({ id }) => id !== action.id);
		const newBanished = state.banished.slice();
		newBanished.unshift(cardBanished[0]);

		return {
			...state,
			hand: newHand,
			banished: newBanished,
		};
	}
	case 'RAISE_DEFENSE': {
		const newdefense = Math.min(
			(action.target.defense + action.defense),
			action.target.maxDefense
		);
		return {
			...state,
			player: {
				...action.target,
				defense: newdefense,
			},
		};
	}
	default:
		return state;
	}
};
