import { drawCard, discardCard, banishCard, clearHighlightCard, } from '../actions/cards';
import { raiseStrength, raiseMarked, raiseToughness, raiseDefense, raisePoison, dealDamage, keepDefenseOnce } from '../actions/combatEffects';
import targetRandomEnemy from './targetRandomEnemy';
import { store } from '../app';
import { 
		delay,
		getCombatantById,
		makeAttack,
		attackOnce,
		makeDefend,
		defendOnce,
		startBuffAnimation,
		endBuffAnimation,
		applyPoison,
		getEnemyGroup
} from './helpers';
import { applyHighlight, applyShaking, clearShaking, clearAllCosmeticEffects } from '../actions/cosmeticBattleEffects';
import { playerDefault } from './playerList';
import targetPlayer from './targetPlayer';

// Animation constants and functions - possibly to be moved later
const pauseBeforePlayingCard = 100;
const pauseAfterBuffHighlight = 220;
const pauseAfterCardEffect = 220;
const pauseAfterPlayingCard = 450;

const pauseBeforeUnplayedCard = 100;
const pauseAfterUnplayedBuffHighlight = 220;
const pauseAfterUnplayedCardEffect = 120;


// helper function used to un-highlight and then discard a card

const cardFinished = (card) => {
	store.dispatch(clearHighlightCard(card));
	if(card.banishedOnUse) {
		store.dispatch(banishCard(card));
	} else {
		store.dispatch(discardCard(card));
	}
};

const safeApplyHightlight = (target) => {
	if (target) store.dispatch(applyHighlight(target))
};

// List of all cards in game

export const cardDefault = {
	id: null,
	name: '',
	type: undefined,
	attack: null,
	defense: null,
	strength: null,
	toughness: null,
	poison: null,
	numberOfHits: 1,
	portrait: null,
	specialText: null,
	flavourText: null,
	effects: [],
	unplayedAttack: null,
	unplayedDefense: null,
	unplayedMarked: 0,
	unplayedSpecialText: null,
	unplayedEffects: [],
	highlighted: false,
	highlightUnplayed: false,
	banishedOnUse: false,
};

// Base warrior cards

export const baseAttack = {
	name: 'Thrust',
	type: 'Attack',
	attack: 5,
	unplayedDefense: 2,
	numberOfHits: 1,
	specialText: (card, player = playerDefault) => {return `Attack for ${card.attack + player.strength} damage`},
	effects: [
		async (player, card) => {
			const target = targetRandomEnemy();
			await delay(pauseBeforePlayingCard);
			store.dispatch(applyHighlight(target));
			await attackOnce(target, player, card.attack);
			await delay(pauseAfterCardEffect);
			store.dispatch(clearAllCosmeticEffects(target));
		},
		async (player, card) => cardFinished(card),
	],
	unplayedSpecialText: (card, player = playerDefault) => {return `Defend for ${card.unplayedDefense + player.toughness}`},
	unplayedEffects: [
		async (player, card) => {
			const target = player;
			await delay(pauseBeforeUnplayedCard);
			store.dispatch(applyHighlight(target));
			await delay(pauseAfterUnplayedBuffHighlight);
			await defendOnce(target, player, card.unplayedDefense);
			await delay(pauseAfterUnplayedCardEffect);
		}
	],
};

export const baseDefend = {
	name: 'Block',
	type: 'Defense',
	defense: 6,
	unplayedMarked: 2,
	specialText: (card, player = playerDefault) => {return `Defend for ${card.defense + player.toughness}`},
	effects: [
		async (player, card) => {
			const target = player;
			await delay(pauseBeforePlayingCard);
			store.dispatch(applyHighlight(target));
			await defendOnce(target, player, card.defense);
			await delay(pauseAfterCardEffect);
			store.dispatch(clearAllCosmeticEffects(target));
		},
		async (player, card) => cardFinished(card),
	],
	unplayedSpecialText: (card, player = playerDefault) => {return `Mark a target for ${card.unplayedMarked}`},
	unplayedEffects: [
		async (player, card) => {
			const target = targetRandomEnemy();
			await delay(pauseBeforeUnplayedCard);
			store.dispatch(applyHighlight(target));
			store.dispatch(raiseMarked(target, card.unplayedMarked)),
			await delay(pauseAfterUnplayedCardEffect);
		}
	],
};

export const defenseKeep = {
	name: 'Bodyguards',
	type: 'Defense',
	defense: 12,
	specialText: (card, player = playerDefault) => {return `Defend for ${card.defense + player.toughness}`},
	effects: [
		async (player, card) => {
			const target = player;
			await delay(pauseBeforePlayingCard);
			await safeApplyHightlight(target);
			await defendOnce(target, player, card.defense);
			await delay(pauseAfterCardEffect);
			store.dispatch(clearAllCosmeticEffects(target));
		},
		async (player, card) => cardFinished(card),
	],
	unplayedSpecialText: (card, player = playerDefault) => {return `Do not lose defense at start of next turn.`},
	unplayedEffects: [
		async (player, card) => {
			const target = player;
			await delay(pauseBeforeUnplayedCard);
			store.dispatch(applyHighlight(target));
			await delay(pauseAfterUnplayedBuffHighlight);
			store.dispatch(keepDefenseOnce(target)); // Right now, this is getting set to false during both defense-clears, so it's not working
			await delay(pauseAfterUnplayedCardEffect);
			store.dispatch(clearAllCosmeticEffects(target));
		}
	],
};

// Defense stacking

export const doubleShield = {
	name: 'Flashing Shield',
	type: 'Defense',
	defense: 10,
	unplayedAttack: 2,
	specialText: (card, player = playerDefault) => {return `Defend for ${card.defense + player.toughness}, 2 times`},
	effects: [
		async (player, card) => {
			const target = player;
			await delay(pauseBeforePlayingCard);
			await safeApplyHightlight(target);
			await defendOnce(target, player, card.defense);
			await defendOnce(target, player, card.defense);
			await delay(pauseAfterCardEffect);
			store.dispatch(clearAllCosmeticEffects(target));
		},
		async (player, card) => cardFinished(card),
	],
	unplayedSpecialText: (card, player = playerDefault) => {return `Attack for ${card.unplayedAttack + player.strength}`},
	unplayedEffects: [
		async (player, card) => {
			const target = targetRandomEnemy();
			await delay(pauseBeforeUnplayedCard);
			await safeApplyHightlight(target);
			await attackOnce(target, player, card.unplayedAttack);
			await delay(pauseAfterUnplayedCardEffect);
		}
	],
};

export const bodySlam = {
	name: 'Backbreaker',
	type: 'Attack',
	attack: 4,
	defense: 4,
	specialText: (card, player = playerDefault) => {return `Attack for ${card.attack + player.strength} and Defend for ${card.defense + player.toughness}`},
	effects: [
		async (player, card) => {
			let target = targetRandomEnemy();
			await delay(pauseBeforePlayingCard);
			store.dispatch(applyHighlight(target));
			await attackOnce(target, player, card.attack);
			await delay(pauseAfterCardEffect);
			store.dispatch(clearAllCosmeticEffects(target));
			target = player;
			await delay(pauseBeforePlayingCard);
			await safeApplyHightlight(target);
			await defendOnce(target, player, card.defense);
			await delay(pauseAfterCardEffect);
			store.dispatch(clearAllCosmeticEffects(target));
		},
		async (player, card) => cardFinished(card),
	],
	unplayedSpecialText: (card, player = playerDefault) => {return `Attack with damage equal to your defense (${player.defense} damage)`},
	unplayedEffects: [
		async (player, card) => {
			const target = targetRandomEnemy();
			await delay(pauseBeforeUnplayedCard);
			await safeApplyHightlight(target);
			await attackOnce(target, player, card.unplayedAttack);
			await delay(pauseAfterUnplayedCardEffect);
		}
	],
};

// Multi-attack

export const wildStrikes = {
	name: 'Furious Slaughter',
	type: 'Attack',
	attack: 3,
	unplayedAttack: 3,
	numberOfHits: 1,
	specialText: (card, player = playerDefault) => {return `Attack random targets for ${card.attack + player.strength}, 3 times.`},
	effects: [
		async (player, card) => {
			let target = targetRandomEnemy();
			await delay(pauseBeforePlayingCard);
			store.dispatch(applyHighlight(target));
			await attackOnce(target, player, card.attack);
			store.dispatch(clearAllCosmeticEffects(target));
			target = targetRandomEnemy();
			await delay(pauseBeforePlayingCard);
			store.dispatch(applyHighlight(target));
			await attackOnce(target, player, card.attack);
			store.dispatch(clearAllCosmeticEffects(target));
			target = targetRandomEnemy();
			await delay(pauseBeforePlayingCard);
			store.dispatch(applyHighlight(target));
			await attackOnce(target, player, card.attack);
			await delay(pauseAfterCardEffect);
			store.dispatch(clearAllCosmeticEffects(target));
		},
		async (player, card) => cardFinished(card),
	],
	unplayedSpecialText: (card, player = playerDefault) => {return `Suffer ${card.unplayedAttack} damage`},
	unplayedEffects: [
		async (player, card) => {
			const target = targetPlayer();
			await delay(pauseBeforeUnplayedCard);
			store.dispatch(applyHighlight(target));
			await attackOnce(target, playerDefault, card.unplayedAttack);
			await delay(pauseAfterUnplayedCardEffect);
		}
	],
	flavourText: "You won't like me when I'm angry",
};

export const tripleStrike = {
	name: 'Spear Jabs',
	type: 'Attack',
	attack: 2,
	unplayedDefense: 3,
	numberOfHits: 1,
	specialText: (card, player = playerDefault) => {return `Attack for ${card.attack + player.strength} damage, 3 times`},
	effects: [
		async (player, card) => {
			const target = targetRandomEnemy();
			await delay(pauseBeforePlayingCard);
			await safeApplyHightlight(target);
			await attackOnce(target, player, card.attack);
			await attackOnce(target, player, card.attack);
			await attackOnce(target, player, card.attack);
			await delay(pauseAfterCardEffect);
			store.dispatch(clearAllCosmeticEffects(target));
		},
		async (player, card) => cardFinished(card),
	],
	unplayedSpecialText: (card, player = playerDefault) => {return `Defend for ${card.unplayedDefense + player.toughness}`},
	unplayedEffects: [
		async (player, card) => {
			const target = player;
			await delay(pauseBeforeUnplayedCard);
			await safeApplyHightlight(target);
			await delay(pauseAfterUnplayedBuffHighlight);
			await defendOnce(target, player, card.unplayedDefense);
			await delay(pauseAfterUnplayedCardEffect);
		}
	],
};

export const sweepAttack = {
	name: 'Sweeping Blow',
	type: 'Attack',
	attack: 3,
	unplayedAttack: 3,
	numberOfHits: 1,
	specialText: (card, player = playerDefault) => {return `Attack all enemies for ${card.attack + player.strength} damage`},
	effects: [
		async (player, card) => {
			const enemies = getEnemyGroup();
			if (enemies == null) return;
			for (const enemy of enemies) {
				const target = enemy;
				await delay(pauseBeforePlayingCard);
				store.dispatch(applyHighlight(target));
				await attackOnce(target, player, card.attack);
				await delay(pauseAfterCardEffect);
				store.dispatch(clearAllCosmeticEffects(target));
			}
		},
		async (player, card) => cardFinished(card),
	],
	unplayedSpecialText: (card, player = playerDefault) => {return `Attack for ${card.unplayedAttack + player.strength}`},
	unplayedEffects: [
		async (player, card) => {
			const target = targetRandomEnemy();
			await delay(pauseBeforeUnplayedCard);
			await safeApplyHightlight(target);
			await attackOnce(target, player, card.unplayedAttack);
			await delay(pauseAfterUnplayedCardEffect);
		}
	],
};

// Buffs

export const strengthBuff = {
	name: 'Thirst for Vengeance',
	type: 'Buff',
	strength: 2,
	unplayedAttack: 3,
	banishedOnUse: true,
	specialText: (card, player = playerDefault) => {return `Raise strength by ${card.strength}.`},
	effects: [
		async (player, card) => {
			const target = player;
			await delay(pauseBeforePlayingCard);
			store.dispatch(applyHighlight(target));
			await startBuffAnimation(target, player, card);
			store.dispatch(raiseStrength(player, card.strength)),
			await endBuffAnimation(target, player, card);
			await delay(pauseAfterCardEffect);
			store.dispatch(clearAllCosmeticEffects(target));
		},
		async (player, card) => cardFinished(card),
	],
	unplayedSpecialText: (card, player = playerDefault) => {return `Attack for ${card.unplayedAttack + player.strength}`},
	unplayedEffects: [
		async (player, card) => {
			const target = targetRandomEnemy();
			await delay(pauseBeforeUnplayedCard);
			await safeApplyHightlight(target);
			await attackOnce(target, player, card.unplayedAttack);
			await delay(pauseAfterUnplayedCardEffect);
		}
	],
};

export const toughBuff = {
	name: 'Tenacity',
	type: 'Buff',
	toughness: 2,
	unplayedPoison: 3,
	banishedOnUse: true,
	specialText: (card, player = playerDefault) => {return `Raise toughness by ${card.toughness}.`},
	effects: [
		async (player, card) => {
			const target = player;
			await delay(pauseBeforePlayingCard);
			store.dispatch(applyHighlight(target));
			await startBuffAnimation(target, player, card);
			store.dispatch(raiseToughness(player, card.toughness)),
			await endBuffAnimation(target, player, card);
			await delay(pauseAfterCardEffect);
			store.dispatch(clearAllCosmeticEffects(target));
		},
		async (player, card) => cardFinished(card),
	],
	unplayedSpecialText: (card, player = playerDefault) => {return `Poison a target for ${card.unplayedPoison}`},
	unplayedEffects: [
		async (player, card) => {
			const target = targetRandomEnemy();
			await delay(pauseBeforeUnplayedCard);
			store.dispatch(applyHighlight(target));
			await applyPoison(target, player, card.unplayedPoison);
			await delay(pauseAfterUnplayedCardEffect);
			store.dispatch(clearAllCosmeticEffects(target));
		}
	],
};

export const buffStrenghTough = {
	name: "Queen's Edict",
	type: 'Buff',
	toughness: 1,
	strength: 1,
	defense: 5,
	unplayedDefense: 3,
	banishedOnUse: true,
	specialText: (card, player = playerDefault) => {return `Defend for ${card.defense + player.toughness}, raise strength by ${card.strength}, raise toughness by ${card.toughness}.`},
	effects: [
		async (player, card) => {
			const target = player;
			await delay(pauseBeforePlayingCard);
			store.dispatch(applyHighlight(target));
			await defendOnce(target, player, card.defense);
			await startBuffAnimation(target, player, card);
			store.dispatch(raiseToughness(targetPlayer(), card.toughness)),
			store.dispatch(raiseStrength(targetPlayer(), card.strength)),
			await endBuffAnimation(target, player, card);
			await delay(pauseAfterCardEffect);
			store.dispatch(clearAllCosmeticEffects(target));
		},
		async (player, card) => cardFinished(card),
	],
	unplayedSpecialText: (card, player = playerDefault) => {return `Defend for ${card.unplayedDefense + player.toughness}`},
	unplayedEffects: [
		async (player, card) => {
			const target = player;
			await delay(pauseBeforeUnplayedCard);
			store.dispatch(applyHighlight(player));
			await delay(pauseAfterUnplayedBuffHighlight);
			await defendOnce(target, player, card.unplayedDefense);
			await delay(pauseAfterUnplayedCardEffect);
		}
	],
};

export const grief = {
	name: 'Grief of Tomyris',
	type: 'Buff',
	strength: 4,
	unplayedAttack: 3, 
	banishedOnUse: true,
	specialText: (card, player = playerDefault) => {return `Raise strength by ${card.strength}`},
	effects: [
		async (player, card) => {
			const target = player;
			await delay(pauseBeforePlayingCard);
			store.dispatch(applyHighlight(target));
			await startBuffAnimation(target, player, card);
			store.dispatch(raiseStrength(targetPlayer(), card.strength)),
			await endBuffAnimation(target, player, card);
			await delay(pauseAfterCardEffect);
			store.dispatch(clearAllCosmeticEffects(target));
		},
		async (player, card) => cardFinished(card),
	],
	unplayedSpecialText: (card, player = playerDefault) => {return `Suffer ${card.unplayedAttack} damage`},
	unplayedEffects: [
		async (player, card) => {
			const target = targetPlayer();
			await delay(pauseBeforeUnplayedCard);
			store.dispatch(applyHighlight(target));
			await attackOnce(target, playerDefault, card.unplayedAttack);
			await delay(pauseAfterUnplayedCardEffect);
		},
	],
	flavourText: '"My son will not go unavenged."'
};

// Mark keyword

export const attackMark = {
	name: 'Mark for Death',
	type: 'Attack',
	attack: 3,
	marked: 5,
	unplayedMarked: 2,
	banishedOnUse: true,
	specialText: (card, player = playerDefault) => {return `Attack for ${card.attack + player.strength} and mark the target for ${card.marked}`},
	effects: [
		async (player, card) => {
			const target = targetRandomEnemy();
			await delay(pauseBeforePlayingCard);
			store.dispatch(applyHighlight(target));
			await attackOnce(target, player, card.attack);
			store.dispatch(raiseMarked(target, card.marked)),
			await delay(pauseAfterCardEffect);
			store.dispatch(clearAllCosmeticEffects(target));
		},
		async (player, card) => cardFinished(card),
	],
	unplayedSpecialText: (card, player = playerDefault) => {return `Mark a target for ${card.unplayedMarked}`},
	unplayedEffects: [
		async (player, card) => {
			const target = targetRandomEnemy();
			await delay(pauseBeforeUnplayedCard);
			store.dispatch(applyHighlight(target));
			store.dispatch(raiseMarked(target, card.unplayedMarked)),
			await delay(pauseAfterUnplayedCardEffect);
		}
	],
};

export const strengthIfMarked = {
	name: 'Hunter of the Guilty',
	type: 'Attack',
	attack: 5,
	strength: 1,
	unplayedMarked: 2,
	specialText: (card, player = playerDefault) => {return `Attack for ${card.attack + player.strength}. If the target is marked, gain ${card.strength} strength.`},
	effects: [
		async (player, card) => {
			const target = targetRandomEnemy();
			await delay(pauseBeforePlayingCard);
			store.dispatch(applyHighlight(target));
			await attackOnce(target, player, card.attack);
			await delay(pauseAfterCardEffect);
			store.dispatch(clearAllCosmeticEffects(target));
			if (target.marked > 0) {
				const target = player;
				await delay(pauseBeforePlayingCard);
				store.dispatch(applyHighlight(target));
				await startBuffAnimation(target, player, card);
				store.dispatch(raiseStrength(targetPlayer(), card.strength)),
				await endBuffAnimation(target, player, card);
				await delay(pauseAfterCardEffect);
				store.dispatch(clearAllCosmeticEffects(target));
			}
		},
		async (player, card) => cardFinished(card),
	],
	unplayedSpecialText: (card, player = playerDefault) => {return `Mark a target for ${card.unplayedMarked}`},
	unplayedEffects: [
		async (player, card) => {
			const target = targetRandomEnemy();
			await delay(pauseBeforeUnplayedCard);
			store.dispatch(applyHighlight(target));
			store.dispatch(raiseMarked(target, card.unplayedMarked)),
			await delay(pauseAfterUnplayedCardEffect);
		}
	],
};

// Poison keyword

export const poisonSplash = {
	name: 'Poison Splash',
	type: 'Attack',
	poison: 6,
	unplayedDefense: 3,
	specialText: (card, player = playerDefault) => {return `Poison a target for ${card.poison}`},
	effects: [
		async (player, card) => {
			const target = targetRandomEnemy();
			await delay(pauseBeforePlayingCard);
			store.dispatch(applyHighlight(target));
			await applyPoison(target, player, card.poison);
			await delay(pauseAfterCardEffect);
			store.dispatch(clearAllCosmeticEffects(target));
		},
		async (player, card) => cardFinished(card),
	],
	unplayedSpecialText: (card, player = playerDefault) => {return `Defend for ${card.unplayedDefense + player.toughness}`},
	unplayedEffects: [
		async (player, card) => {
			const target = player;
			await delay(pauseBeforeUnplayedCard);
			store.dispatch(applyHighlight(player));
			await delay(pauseAfterUnplayedBuffHighlight);
			await defendOnce(target, player, card.unplayedDefense);
			await delay(pauseAfterUnplayedCardEffect);
		}
	],
};

export const poisonCloud = {
	name: 'Poison Mist',
	type: 'Attack',
	poison: 4,
	unplayedAttack: 3,
	numberOfHits: 1,
	specialText: (card, player = playerDefault) => {return `Poison all enemies for ${card.poison}`},
	effects: [
		async (player, card) => {
			const enemies = getEnemyGroup();
			if (enemies == null) return;
			for (const enemy of enemies) {
				const target = enemy;
				await delay(pauseBeforePlayingCard);
				store.dispatch(applyHighlight(target));
				await applyPoison(target, player, card.poison);
				await delay(pauseAfterCardEffect);
				store.dispatch(clearAllCosmeticEffects(target));
			}
		},
		async (player, card) => cardFinished(card),
	],
	unplayedSpecialText: (card, player = playerDefault) => {return `Suffer ${card.unplayedAttack} damage`},
	unplayedEffects: [
		async (player, card) => {
			const target = targetPlayer();
			await delay(pauseBeforeUnplayedCard);
			store.dispatch(applyHighlight(target));
			await attackOnce(target, playerDefault, card.unplayedAttack);
			await delay(pauseAfterUnplayedCardEffect);
		}
	],
	flavourText: 'This mist may harm friend and foe alike.'
};

// (unused) Card Draw

export const testCard3 = {
	id: 'placeholder3',
	name: 'Test Draw Card',
	type: 'Test',
	effects: [
		() => store.dispatch(drawCard()),
		() => store.dispatch(drawCard()),
		async (player, card) => cardFinished(card),
	],
	specialText: 'Draw 2 cards',
};
