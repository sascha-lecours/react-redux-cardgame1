import * as _ from 'lodash';
import shuffle from 'shuffle-array';
import { playerDefault } from '../gameData/playerList';
import { moveDefault } from '../gameData/enemyList';

// Overall Combat-handling Game Reducer

const gameReducerDefaultState = {
	hand: [],
	deck: [],
	discard: [],
	banished: [],
	playerGroup: [],
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


// Pickmove is where the move defaults are applied to moves
// Todo: this may be moved elsewhere (initializing move arrays on set-enemies)
const pickMove = (enemy) => {
	const newMove = enemy.actions[Math.floor(Math.random() * enemy.actions.length)];
	return {
		...moveDefault,
		...newMove,
	};
};

const killEnemy = ({ id }) => {

};

// Reducer

export default (state = gameReducerDefaultState, action) => {
	switch (action.type) {
	case 'INITIALIZE_PLAYER':
		return {
			...state,
			playerGroup: [{
				...playerDefault,
				...state.player,
				...action.player,
				hp: action.player.maxHp,
				id: action.player.id,
			}],
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
	case 'DISCARD_HAND': {
		const cardsDiscarded = state.hand.slice();
		const newDiscard = state.discard.slice();
		newDiscard.unshift(...cardsDiscarded);

		return {
			...state,
			hand: [],
			discard: newDiscard,
		};
	}
	case 'DRAW_CARD': {
		// DRAW_CARD will reshuffle the discard pile to make a new draw deck if necessary.
		if (!(state.deck.length) && !(state.discard.length)) {
			// TODO: replace  this alert later with something more elegant.
			alert('Deck and discard pile both empty - cannot draw cards!');
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
		const newDefense = Math.min(
			(action.target.defense + action.defense),
			action.target.maxDefense
		);
		return {
			...state,
			enemyGroup: state.enemyGroup.map((enemy) => {
				if (enemy.id === action.target.id) {
					return {
						...action.target,
						defense: newDefense,
					};
				} else {
					return enemy;
				}
			}),
			playerGroup: state.playerGroup.map((player) => {
				if (player.id === action.target.id) {
					return {
						...action.target,
						defense: newDefense,
					};
				} else {
					return player;
				}
			}),
		};
	}
	case 'RAISE_STRENGTH': {
		const newStrength = Math.min(
			(action.target.strength + action.strength),
			action.target.maxStrength
		);
		return {
			...state,
			enemyGroup: state.enemyGroup.map((enemy) => {
				if (enemy.id === action.target.id) {
					return {
						...action.target,
						strength: newStrength,
					};
				} else {
					return enemy;
				}
			}),
			playerGroup: state.playerGroup.map((player) => {
				if (player.id === action.target.id) {
					return {
						...action.target,
						strength: newStrength,
					};
				} else {
					return player;
				}
			}),
		};
	}
	case 'RAISE_TOUGHNESS': {
		const newToughness = Math.min(
			(action.target.toughness + action.toughness),
			action.target.maxToughness
		);
		return {
			...state,
			enemyGroup: state.enemyGroup.map((enemy) => {
				if (enemy.id === action.target.id) {
					return {
						...action.target,
						toughness: newToughness,
					};
				} else {
					return enemy;
				}
			}),
			playerGroup: state.playerGroup.map((player) => {
				if (player.id === action.target.id) {
					return {
						...action.target,
						toughness: newToughness,
					};
				} else {
					return player;
				}
			}),
		};
	}
	case 'RAISE_MARKED': {
		let newMarked = Math.min(
			(action.target.marked + action.marked),
			action.target.maxMarked
		);
		newMarked = Math.max(newMarked, 0);
		return {
			...state,
			enemyGroup: state.enemyGroup.map((enemy) => {
				if (enemy.id === action.target.id) {
					return {
						...enemy,
						marked: newMarked,
					};
				} else {
					return enemy;
				}
			}),
			playerGroup: state.playerGroup.map((player) => {
				if (player.id === action.target.id) {
					return {
						...player,
						marked: newMarked,
					};
				} else {
					return player;
				}
			}),
		};
	}
	case 'RAISE_POISON': {
		let newPoison = Math.min(
			(action.target.poison + action.poison),
			action.target.maxPoison
		);
		newPoison = Math.max(newPoison, 0);
		return {
			...state,
			enemyGroup: state.enemyGroup.map((enemy) => {
				if (enemy.id === action.target.id) {
					return {
						...enemy,
						poison: newPoison,
					};
				} else {
					return enemy;
				}
			}),
			playerGroup: state.playerGroup.map((player) => {
				if (player.id === action.target.id) {
					return {
						...player,
						poison: newPoison,
					};
				} else {
					return player;
				}
			}),
		};
	}
	case 'DEAL_DAMAGE': {
		let workingDamage = action.damage;
		let workingHp = action.target.hp;
		let workingDefense = action.target.defense;
		let i;
		for (i = 0; i < action.numberOfHits; i += 1) {
			workingDamage = action.damage;
			workingDamage = Math.max((workingDamage - workingDefense), 0);
			workingDefense = Math.max((workingDefense - action.damage), 0);
			workingHp = Math.max((workingHp - workingDamage), 0);
		}
		return {
			...state,
			enemyGroup: state.enemyGroup.map((enemy) => {
				if (enemy.id === action.target.id) {
					return {
						...enemy,
						hp: workingHp,
						defense: workingDefense,
					};
				} else {
					return enemy;
				}
			}),
			playerGroup: state.playerGroup.map((player) => {
				if (player.id === action.target.id) {
					return {
						...player,
						hp: workingHp,
						defense: workingDefense,
					};
				} else {
					return player;
				}
			}),
		};
	}
	case 'KILL_ENEMY': {
		// TODO - notify effects that trigger off of kills
		const newEnemies = state.enemyGroup.slice().filter(({ id }) => id !== action.id);
		return {
			...state,
			enemyGroup: newEnemies,
		};
	}
	case 'APPLY_HIGHLIGHT': {
		return {
			...state,
			enemyGroup: state.enemyGroup.map((enemy) => {
				if (enemy.id === action.target.id) {
					return {
						...enemy,
						highlighted: true,
					};
				} else {
					return enemy;
				}
			}),
			playerGroup: state.playerGroup.map((player) => {
				if (player.id === action.target.id) {
					return {
						...player,
						highlighted: true,
					};
				} else {
					return player;
				}
			}),
		};
	}
	case 'APPLY_IS_ACTIVE': {
		return {
			...state,
			enemyGroup: state.enemyGroup.map((enemy) => {
				if (enemy.id === action.target.id) {
					return {
						...enemy,
						isActive: true,
					};
				} else {
					return enemy;
				}
			}),
			playerGroup: state.playerGroup.map((player) => {
				if (player.id === action.target.id) {
					return {
						...player,
						isActive: true,
					};
				} else {
					return player;
				}
			}),
		};
	}
	case 'APPLY_SHAKING': {
		return {
			...state,
			enemyGroup: state.enemyGroup.map((enemy) => {
				if (enemy.id === action.target.id) {
					return {
						...enemy,
						shaking: true,
					};
				} else {
					return enemy;
				}
			}),
			playerGroup: state.playerGroup.map((player) => {
				if (player.id === action.target.id) {
					return {
						...player,
						shaking: true,
					};
				} else {
					return player;
				}
			}),
		};
	}
	case 'CLEAR_SHAKING': {
		return {
			...state,
			enemyGroup: state.enemyGroup.map((enemy) => {
				if (enemy.id === action.target.id) {
					return {
						...enemy,
						shaking: false,
					};
				} else {
					return enemy;
				}
			}),
			playerGroup: state.playerGroup.map((player) => {
				if (player.id === action.target.id) {
					return {
						...player,
						shaking: false,
					};
				} else {
					return player;
				}
			}),
		};
	}
	case 'CLEAR_ALL_COSMETIC_EFFECTS': {
		return {
			...state,
			enemyGroup: state.enemyGroup.map((enemy) => {
				if (enemy.id === action.target.id) {
					return {
						...enemy,
						isActive: false,
						highlighted: false,
						shaking: false,
						buffing: false,
						gettingHit: false,
					};
				} else {
					return enemy;
				}
			}),
			playerGroup: state.playerGroup.map((player) => {
				if (player.id === action.target.id) {
					return {
						...player,
						isActive: false,
						highlighted: false,
						shaking: false,
						buffing: false,
						gettingHit: false,
					};
				} else {
					return player;
				}
			}),
		};
	}
	// End of reducer switch (default case)
	default:
		return state;
	}
};

