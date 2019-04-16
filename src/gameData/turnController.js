import React from 'react';
import { connect } from 'react-redux';
import { store } from '../app';
import { advancePhase, setPhase } from '../actions/turn';
import { applyIsActive, clearAllCosmeticEffects } from '../actions/cosmeticBattleEffects';
import { delay } from './helpers';
import { testCard1, testCard2, testCard3, testCard4, testCard5, testCard6, testCard7, testCard8, testCard9 } from './cardList';
import { setHand, setDeck, initializePlayer, drawCard, discardHand, highlightCard, clearHighlightCard } from '../actions/cards';
import { setEnemies, setNewMove, killEnemy } from '../actions/enemies';
import { raiseMarked, raisePoison, dealDamage } from '../actions/combatEffects';
import { testEnemy1, testEnemy2 } from './enemyList';
import { warrior, bard } from './playerList';
import useMove from './useMove';
import useUnplayedCard from './useUnplayedCard';

// A component that manages the game state
// This may be best handled using a subscribe listener that checks for certain key changes in...
// ... in the store and implements turn events accordingly


// -> Dormant state when awaiting combat



// -> Begin turn loop.
// 1. Deal cards
// --> Deal player hand(s), including placing 'innate' cards in first time through.
// 2. Assign enemy moves
// 3. Player start-of-turn effects, checking for combat-over
// 4. Player plays card
// 5. Resolve all card effects, including visuals/sound and checking for combat-over
// 6. Player turn ends (muliple cards?) - player end-of-turn effects
// 7. Enemy start-of-turn effects, checking for combat-over

// 8. Enemy actions resolve, up through array, checking for combat-over
// 9. Enemy end-of-turn effects, checking for combat-over
// 10. Increment turn counter, start back at step 1.

// -> Resolve post-combat
// 1. End-of-combat effects such as healing
// 2. Gain rewards (gold, relics, potions, cards, etc.)
// 3. Hand off to "campaign" component that moves on  higher scope. 


class TurnController extends React.Component {

// -> Initialize combat.
// --> Fetch player stats and deck(s), possibly including modified cards, buffs/debuffs, etc.
// --> Fetch enemy stats

	// Timing variables
	pauseBeforeEnemyMove = 800;
	pauseAfterEnemyMove = 300;
	pauseBeforePlayerTurn = 1000;
	pauseAfterPlayerTurn = 1000;
	pauseBeforeUnplayedCard = 200;
	pauseAfterUnplayedCard = 200;

	unplayedEffectsDone = false;

	initializeCombat = () => {
		store.dispatch(initializePlayer(warrior));

		store.dispatch(setHand([testCard1, testCard1, testCard1]));

		store.dispatch(setDeck([testCard1, testCard2, testCard1, testCard4, testCard5, testCard6, testCard7, testCard8, testCard9]));
		store.dispatch(setEnemies([testEnemy2, testEnemy2, testEnemy2]));
		this.props.advancePhase();
		
	};



	enemiesTakeTurn = async () => {
		this.props.game.enemyGroup.forEach(
			async (enemy) => {
				await this.props.applyIsActive(enemy);
				await delay(this.pauseBeforeEnemyMove);
				await useMove(enemy, enemy.nextMove);
				await delay(this.pauseAfterEnemyMove);
		});
	};

	// TODO: Currently this is not resolving with the appropriate delay - toubleshoot
	applyUnplayedCardEffects = () => {
		this.props.game.hand.forEach(
			 (card) => {
				if (card.unplayedEffects.length > 0) {
					delay(this.pauseBeforeUnplayedCard);
					useUnplayedCard(this.props.game.playerGroup[0], card);
					delay(this.pauseAfterUnplayedCard);
					this.props.clearHighlightCard(card);
				};
		});
		this.unplayedEffectsDone = true;
	};

	killZeroHpEnemies = () => {
		this.props.game.enemyGroup.forEach((enemy) => {
			if(enemy.hp === 0) {
				console.log(`${enemy.name} is at 0 hp`);
				this.props.killEnemy(enemy);
			}
		})
	};

	playerStartOfTurn = async () => {
		// Remove defense
		// TODO: Implement defense removal
		// set "active" cosmetic effect
		await delay(this.pauseBeforePlayerTurn);
		await this.props.applyIsActive(this.props.game.playerGroup[0]);
	};

	playerEndOfTurn = () => {
		this.applyUnplayedCardEffects();
		// remove all cosmetic effects
		this.props.clearAllCosmeticEffects(this.props.game.playerGroup[0]);
		delay(this.pauseAfterPlayerTurn);
		console.log('player turn is over');
	};

	reduceAllMarked = () => {
		// Reduce all enemy Marked status by 1
		this.props.game.enemyGroup.forEach((enemy) => {
			this.props.raiseMarked(enemy, -1);
		});
	};

	resolveEnemyPoison = () => {
		// Enemies receive damage equal to their poison
		this.props.game.enemyGroup.forEach((enemy) => {
			this.props.dealDamage(enemy, null, enemy.poison, 1);
		});

		// Reduce all enemy poison status by 1
		this.props.game.enemyGroup.forEach((enemy) => {
			this.props.raisePoison(enemy, -1);
		});

	};

	resolvePlayerPoison = () => {
		// Players receive damage equal to their poison
		this.props.game.playerGroup.forEach((player) => {
			this.props.dealDamage(player, null, player.poison, 1);
		});

		// Reduce all player poison status by 1
		this.props.game.playerGroup.forEach((player) => {
			this.props.raisePoison(player, -1);
		});

	};


	// Lifecycle hooks:

	componentDidMount() {
		this.initializeCombat();
	};

	componentDidUpdate() {
			// -> Begin turn loop.
		const {
			advancePhase,
			setPhase,
			setNewMoves,
			drawCard,
			discardHand,
		} = this.props;

		const { phase } = this.props.turn;

		if (phase === 1) {
			// 1. Deal cards
				// --> Deal player hand(s), including placing 'innate' cards in first time through.

				// TODO: The logic below will need to account for the case where the deck and hand both run out, as well.
				if (this.props.game.hand.length >= this.props.game.playerGroup[0].startHandSize) {
					advancePhase();
				} else {
					drawCard();
				}
		} else if (phase === 2) {
			// 2. Assign enemy moves
				setNewMoves(this.props.game.enemyGroup);
				advancePhase();

		} else if (phase === 3) {
			// 3. Player start-of-turn effects, checking for combat-over
				//TODO: implement
				this.playerStartOfTurn();
				this.resolvePlayerPoison();
				advancePhase();

		} else if (phase === 4) {
				// 4. Player plays card - phase will advance when they play

		} else if (phase === 5) {
			// 5. Resolve all card effects, including visuals/sound and checking for combat-over
				//TODO: implement
				// - kill enemies now at 0 hp
				// then check for combat over
				advancePhase();

		} else if (phase === 6) {

			// 6. Player turn ends (muliple cards?) - player end-of-turn effects, including discarding card
			this.playerEndOfTurn();
			this.reduceAllMarked();
			if (this.unplayedEffectsDone) {advancePhase(); this.unplayedEffectsDone = false;}


		} else if (phase === 7) {
			//7. Discard hand
				discardHand();
				advancePhase();

		} else if (phase === 8) {
			// 8. Enemy start-of-turn effects, checking for combat-over
				this.resolveEnemyPoison();
				this.killZeroHpEnemies();
				// then check for combat over
				advancePhase();

		} else if (phase === 9) {
			// 9. Enemy actions resolve, up through array, checking for combat-over
				this.enemiesTakeTurn();
				advancePhase();

		} else if (phase === 10) {
			// 10. Enemy end-of-turn effects, checking for combat-over
				//TODO: implement
				// - kill enemies now at 0 hp
				// then check for combat over
				advancePhase();

		} else if (phase === 11) {
			// 11. Increment turn counter, start back at step 1.
				setPhase(1);
		};
	};



// -> Resolve post-combat
// 1. End-of-combat effects such as healing
// 2. Gain rewards (gold, relics, potions, cards, etc.)
// 3. Hand off to "campaign" component that moves on  higher scope.


	// Non-rendered component
	render() { return null }
};
  
  const mapStateToProps = (state, props) => ({
	game: state.game,
	turn: state.turn,
  });
  
  const mapDispatchToProps = (dispatch, props) => ({
	advancePhase: () => dispatch(advancePhase()),
	applyIsActive: (target) => dispatch(applyIsActive(target)),
	clearAllCosmeticEffects: (target) => dispatch(clearAllCosmeticEffects(target)),
	clearHighlightCard: (card) => dispatch(clearHighlightCard(card)),
	dealDamage: (target, source, damage, numberOfHits) => dispatch(dealDamage(target, source, damage, numberOfHits)),
	discardHand: () => dispatch(discardHand()),
	drawCard: () => dispatch(drawCard()),
	highlightCard: (card) => dispatch(highlightCard(card)),
	killEnemy: (enemy) => dispatch(killEnemy(enemy)),
	raiseMarked: (enemy, marked) => dispatch(raiseMarked(enemy, marked)),
	raisePoison: (target, poison) => dispatch(raisePoison(target, poison)),
	setPhase: (phase) => dispatch(setPhase(phase)),
	setNewMoves: (enemyGroup) => { enemyGroup.forEach(element => {
			dispatch(setNewMove(element));
		});
	},
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(TurnController);