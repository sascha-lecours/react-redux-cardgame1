import React from 'react';
import { connect } from 'react-redux';
import { store } from '../app';
import { advancePhase } from '../actions/turn';
import { testCard1, testCard2, testCard3, testCard4, testCard5, testCard6, testCard7 } from '../gameData/cardList';
import { setHand, setDeck, initializePlayer } from '../actions/cards';
import { setEnemies, setNewMove } from '../actions/enemies';
import { testEnemy1, testEnemy2 } from '../gameData/enemyList';
import { warrior, bard } from '../gameData/playerList';
import { useMove } from '../gameData/useMove';

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


export class TurnController extends React.Component {
	// constructor() {
	// 	super();
	// };


// -> Initialize combat.
// --> Fetch player stats and deck(s), possibly including modified cards, buffs/debuffs, etc.
// --> Fetch enemy stats



initializeCombat = () => {
	store.dispatch(initializePlayer(warrior));
	store.dispatch(setHand([testCard1, testCard6, testCard4, testCard7]));
	store.dispatch(setDeck([testCard1, testCard2, testCard2, testCard2, testCard2, testCard2]));
	store.dispatch(setEnemies([testEnemy1, testEnemy2]));
	
};

enemiesTakeTurn = () => {
	this.props.game.enemyGroup.forEach(element => {
		console.log(`${element.name} will use ${element.nextMove.name}`);
		(element) => useMove(element, element.nextMove); // Why is this not working?
	});
}

componentDidMount() {
	this.initializeCombat();
};

componentDidUpdate() {
	const { advancePhase, setNewMoves } = this.props;
	const { phase } = this.props.turn;

	if(phase === 0) {
		setNewMoves(this.props.game.enemyGroup);
		advancePhase();
	};
	if (phase === 1) {
		this.enemiesTakeTurn();
		advancePhase();
	}
};

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


	// Non-rendered component
	render() { return null }
  };
  
  const mapStateToProps = (state, props) => ({
	game: state.game,
	turn: state.turn,
  });
  
  const mapDispatchToProps = (dispatch, props) => ({
	advancePhase: () => dispatch(advancePhase()),
	setNewMoves: (enemyGroup) => { enemyGroup.forEach(element => {
			dispatch(setNewMove(element));
		}); 
	},
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(TurnController);