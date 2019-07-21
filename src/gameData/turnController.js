import React from 'react';
import { connect } from 'react-redux';
import { store } from '../app';
import { withRouter } from 'react-router-dom';
import { advancePhase, setPhase } from '../actions/turn';
import { applyIsActive, clearAllCosmeticEffects } from '../actions/cosmeticBattleEffects';
import { delay } from './helpers';
import { instantKill } from './cardList';
import { 
	setHand, 
	setDeck, 
	initializePlayer, 
	drawCard, 
	discardHand, 
	highlightCard, 
	clearHighlightCard, 
	allowPlayerToPlayCards, 
	forbidPlayerToPlayCards 
} from '../actions/cards';
import { setEnemies, setNewMove, killEnemy } from '../actions/enemies';
import { 
	raiseMarked, 
	raisePoison, 
	dealDamage, 
	clearDefense, 
} from '../actions/combatEffects';
import {
	getRandomEasyEnemies,
	getRandomMediumEnemies 
} from './enemyList';
import { warrior, bard } from './playerList';
import useMove from './useMove';
import useUnplayedCard from './useUnplayedCard';
import { campaignSetup, savePlayer, advanceCampaign } from '../actions/campaign';
import EnemiesArea from '../components/EnemiesArea';

// A component that manages the game state
// TODO: This may be best handled using a subscribe listener that checks for certain key changes in...
// ... in the store and implements turn events accordingly

export const playCardPhase = 4;

class TurnController extends React.Component {

// -> Initialize combat.
// --> Fetch player stats and deck(s), possibly including modified cards, buffs/debuffs, etc.
// --> Fetch enemy stats

	// Timing variables
	pauseBeforeEnemyMove = 800;
	pauseAfterEnemyMove = 300;

	pauseBeforePlayerTurn = 100;
	pauseAfterPlayerTurn = 1000;

	pauseBeforeEnemyTurn = 500;
	pauseAfterEnemyTurn = 1000;

	pauseBeforeUnplayedCard = 200;
	pauseAfterUnplayedCard = 200;

	unplayedEffectsDone = false;

	// This may not be needed
	lastPhase = null;

	initializeCombat = async () => {
		await store.dispatch(initializePlayer(this.props.campaign.playerSave));
		// TODO: this 'instant kill' card always being in opening hand is a testing-only measure
		await store.dispatch(setHand([instantKill]));
		await store.dispatch(setDeck(this.props.campaign.deckSave));
		await (this.props.campaign.currentLevel < this.props.campaign.easyLevels) ? store.dispatch(setEnemies(getRandomEasyEnemies)) : store.dispatch(setEnemies(getRandomMediumEnemies));
		await this.props.forbidPlayerToPlayCards();
		await this.props.savePlayer(this.props.game.playerGroup[0], this.props.game.deck); 
		await this.props.setPhase(1);
		
	};

	goToVictory = () => {
		// Save current player HP - don't modify saved deck
		this.props.savePlayer(this.props.game.playerGroup[0], this.props.campaign.deckSave);
		this.props.history.push('/victory');
	};

	goToDefeat = () => {
		// TODO: Possibly run a function here to 'reset' combat variables etc. ?
		this.props.history.push('/gameover');
	};

	// Checks both victory and defeat and directs to relevant page (todo: opens relevant modal?)
	checkCombatOver = async () => {
		if(this.props.game.playerGroup[0].hp < 1) {
			this.props.setPhase(0);
			this.goToDefeat();
		}
		if(this.props.game.enemyGroup.length === 0){
			this.props.setPhase(0);
			this.props.advanceCampaign();
			this.goToVictory();
		};
	};

	enemiesTakeTurn = async () => {
		await delay(this.pauseBeforeEnemyTurn);
		for (const enemy of this.props.game.enemyGroup) {
				await this.props.applyIsActive(enemy);
				await delay(this.pauseBeforeEnemyMove);
				await useMove(enemy, enemy.nextMove);
				await delay(this.pauseAfterEnemyMove);
				await this.props.clearAllCosmeticEffects(enemy);
		};
	};

	clearAllEnemyDefense = async () => {
		for (const enemy of this.props.game.enemyGroup) {
				await this.props.clearDefense(enemy);
		};
	};

	applyUnplayedCardEffects = async () => {
		for (const card of this.props.game.hand) {
				if (card.unplayedEffects.length > 0) {
					await delay(this.pauseBeforeUnplayedCard);
					await useUnplayedCard(this.props.game.playerGroup[0], card);
					await delay(this.pauseAfterUnplayedCard);
					await this.props.clearHighlightCard(card);
				}
			};
		// this.unplayedEffectsDone = true;
	};

	killZeroHpEnemies = () => {
		this.props.game.enemyGroup.forEach((enemy) => {
			if(enemy.hp === 0) {
				console.log(`${enemy.name} is at 0 hp`);
				this.props.killEnemy(enemy);
			}
		});
	};

	playerStartOfTurn = async () => {
		// Remove defense
		// set "active" cosmetic effect
		await delay(this.pauseBeforePlayerTurn);
		await this.props.clearDefense(this.props.game.playerGroup[0]);
		await delay(this.pauseBeforePlayerTurn);
		await this.props.applyIsActive(this.props.game.playerGroup[0]);
	};

	playerEndOfTurn = async () => {
		await this.applyUnplayedCardEffects();
		// remove all cosmetic effects
		await this.props.clearAllCosmeticEffects(this.props.game.playerGroup[0]);
		await delay(this.pauseAfterPlayerTurn);
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

	async componentDidUpdate() {
			// -> Begin turn loop.

		const {
			advancePhase,
			setPhase,
			setNewMoves,
			drawCard,
			discardHand,
			allowPlayerToPlayCards,
		} = this.props;

		const {
			checkCombatOver
		} = this;



		const { phase } = this.props.turn;

		if (phase != 1 && (phase === this.lastPhase)) return;
		this.lastPhase = phase;
		if (phase == 0) {
			this.initializeCombat();
		};

		(async () => {
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
					checkCombatOver();
					this.playerStartOfTurn();
					this.resolvePlayerPoison();
					advancePhase();

			} else if (phase === playCardPhase) {
					allowPlayerToPlayCards();
					// 4. Player plays card - phase will advance when they play

			} else if (phase === 5) {
				// 5. Resolve all card effects, including visuals/sound and checking for combat-over
					
					await this.killZeroHpEnemies();
					checkCombatOver();
					advancePhase();

			} else if (phase === 6) {

				// 6. Player turn ends (muliple cards?) - player end-of-turn effects, including discarding card
				console.log('starting end of turn')
				await this.playerEndOfTurn();
				await this.reduceAllMarked();
				// if (this.unplayedEffectsDone) {advancePhase(); this.unplayedEffectsDone = false;}
				advancePhase();


			} else if (phase === 7) {
				//7. Discard hand
					await discardHand();
					advancePhase();

			} else if (phase === 8) {
				// 8. Enemy start-of-turn effects, checking for combat-over
					await this.resolveEnemyPoison();
					await this.killZeroHpEnemies();
					await this.clearAllEnemyDefense();
					checkCombatOver();
					advancePhase();

			} else if (phase === 9) {
				// 9. Enemy actions resolve, up through array, checking for combat-over
					await this.enemiesTakeTurn();
					checkCombatOver();
					advancePhase();

			} else if (phase === 10) {
				// 10. Enemy end-of-turn effects, checking for combat-over
					await this.killZeroHpEnemies();
					checkCombatOver();
					await delay(this.pauseAfterEnemyTurn);
					advancePhase();

			} else if (phase === 11) {
				// 11. Increment turn counter, start back at step 1.
				setPhase(1);
				
			};
		})();
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
	campaign: state.campaign,
  });
  
  const mapDispatchToProps = (dispatch, props) => ({
	advanceCampaign: () => dispatch(advanceCampaign()),
	advancePhase: () => dispatch(advancePhase()),
	allowPlayerToPlayCards: () => dispatch(allowPlayerToPlayCards()),
	applyIsActive: (target) => dispatch(applyIsActive(target)),
	campaignSetup: (player, cards) => dispatch(campaignSetup(player, cards)),
	clearAllCosmeticEffects: (target) => dispatch(clearAllCosmeticEffects(target)),
	clearDefense: (target) => dispatch(clearDefense(target)),
	clearHighlightCard: (card) => dispatch(clearHighlightCard(card)),
	dealDamage: (target, source, damage, numberOfHits) => dispatch(dealDamage(target, source, damage, numberOfHits)),
	discardHand: () => dispatch(discardHand()),
	drawCard: () => dispatch(drawCard()),
	forbidPlayerToPlayCards: () => dispatch(forbidPlayerToPlayCards()),
	highlightCard: (card) => dispatch(highlightCard(card)),
	killEnemy: (enemy) => dispatch(killEnemy(enemy)),
	raiseMarked: (enemy, marked) => dispatch(raiseMarked(enemy, marked)),
	raisePoison: (target, poison) => dispatch(raisePoison(target, poison)),
	savePlayer: (savedPlayer, deck) => dispatch(savePlayer(savedPlayer, deck)),
	setPhase: (phase) => dispatch(setPhase(phase)),
	setNewMoves: (enemyGroup) => { enemyGroup.forEach(element => {
			dispatch(setNewMove(element));
		});
	},
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TurnController));