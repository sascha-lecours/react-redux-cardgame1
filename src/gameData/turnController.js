import React from 'react';
import { connect } from 'react-redux';
import { store } from '../app';
import { advancePhase, setPhase } from '../actions/turn';
import { testCard1, testCard2, testCard3, testCard4, testCard5, testCard6, testCard7, testCard8, testCard9 } from '../gameData/cardList';
import { setHand, setDeck, initializePlayer, drawCard, discardHand } from '../actions/cards';
import { setEnemies, setNewMove, killEnemy } from '../actions/enemies';
import { raiseMarked, raisePoison, dealDamage } from '../actions/combatEffects';
import { testEnemy1, testEnemy2 } from '../gameData/enemyList';
import { warrior, bard } from '../gameData/playerList';
import useMove from '../gameData/useMove';

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

	initializeCombat = () => {
		store.dispatch(initializePlayer(warrior));
		// store.dispatch(setHand([testCard1, testCard6, testCard4, testCard7]));
		store.dispatch(setDeck([testCard1, testCard2, testCard1, testCard4, testCard5, testCard6, testCard7, testCard9]));
		store.dispatch(setEnemies([testEnemy1, testEnemy2]));
		this.props.advancePhase();
		
	};

	enemiesTakeTurn = () => {
		this.props.game.enemyGroup.forEach((enemy) => useMove(enemy, enemy.nextMove));
	};

	killZeroHpEnemies = () => {
		this.props.game.enemyGroup.forEach((enemy) => {
			if(enemy.hp === 0) {
				console.log(`${enemy.name} is at 0 hp`);
				this.props.killEnemy(enemy);
			}
		})
	};

	playerStartOfTurn = () => {
		// Remove defense
	}

	reduceAllMarked = () => {
		// Reduce all enemy Marked status by 1
		this.props.game.enemyGroup.forEach((enemy) => {
			this.props.raiseMarked(enemy, -1);
		})

	}

	resolveEnemyPoison = () => {
		// Enemies receive damage equal to their poison
		this.props.game.enemyGroup.forEach((enemy) => {
			this.props.dealDamage(enemy, null, enemy.poison, 1);
		})

		// Reduce all enemy poison status by 1
		this.props.game.enemyGroup.forEach((enemy) => {
			this.props.raisePoison(enemy, -1);
		})

	}

	resolvePlayerPoison = () => {
		// Players receive damage equal to their poison
		this.props.game.playerGroup.forEach((player) => {
			this.props.dealDamage(player, null, player.poison, 1);
		})

		// Reduce all player poison status by 1
		this.props.game.playerGroup.forEach((player) => {
			this.props.raisePoison(player, -1);
		})

	}

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
			discardHand
		} = this.props;

		const { phase } = this.props.turn;

		switch (phase) {
			case 1:
			// 1. Deal cards
				// --> Deal player hand(s), including placing 'innate' cards in first time through.
				drawCard();
				// TODO: The logic below will need to account for the case where the deck and hand both run out, as well.
				if (this.props.game.hand.length + 1 >= this.props.game.playerGroup[0].startHandSize) {
					advancePhase();
				}
				break;

			case 2: 
			// 2. Assign enemy moves
				setNewMoves(this.props.game.enemyGroup);
				advancePhase();
				break;

			case 3:
			// 3. Player start-of-turn effects, checking for combat-over
				//TODO: implement
				this.resolvePlayerPoison();
				advancePhase();
				break;

			case 4:
				// 4. Player plays card - phase will advance when they play
				break;

			case 5:
			// 5. Resolve all card effects, including visuals/sound and checking for combat-over
				//TODO: implement
				// - kill enemies now at 0 hp
				// then check for combat over
				advancePhase();
				break;
			
			case 6:
			// 6. Player turn ends (muliple cards?) - player end-of-turn effects, including discarding card
				//TODO: implement events other than discarding
				this.reduceAllMarked();
				discardHand();
				advancePhase();
				break;
			
			case 7:
			// 7. Enemy start-of-turn effects, checking for combat-over
				this.resolveEnemyPoison();
				this.killZeroHpEnemies();
				// then check for combat over
				advancePhase();
				break;

			case 8:
			// 8. Enemy actions resolve, up through array, checking for combat-over
				this.enemiesTakeTurn();
				advancePhase();
				break;

			case 9:
			// 9. Enemy end-of-turn effects, checking for combat-over
				//TODO: implement
				// - kill enemies now at 0 hp
				// then check for combat over
				advancePhase();
				break;
			
			// 10. Increment turn counter, start back at step 1.
			case 10:
				setPhase(1);
				break;
			default: 
				break;	
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
	setPhase: (phase) => dispatch(setPhase(phase)),
	setNewMoves: (enemyGroup) => { enemyGroup.forEach(element => {
			dispatch(setNewMove(element));
		});
	},
	drawCard: () => dispatch(drawCard()),
	discardHand: () => dispatch(discardHand()),
	killEnemy: (enemy) => dispatch(killEnemy(enemy)),
	raiseMarked: (enemy, marked) => dispatch(raiseMarked(enemy, marked)),
	raisePoison: (target, poison) => dispatch(raisePoison(target, poison)),
	dealDamage: (target, source, damage, numberOfHits) => dispatch(dealDamage(target, source, damage, numberOfHits)),
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(TurnController);