import React from 'react';
import { connect } from 'react-redux';
import { drawCard } from '../actions/cards';

export const DeckButton = (props) => {
	return (
		<div>
			<button >Deck: {props.deck.length}</button>
		</div>
	);
};

// Previously, this button also had: onClick={props.drawCard}

const mapStateToProps = (state) => {
	return {
		deck: state.game.deck,
	};
};


// const mapDispatchToProps = (dispatch, props) => ({
// 	drawCard: () => dispatch(drawCard()),
// });

export default connect(mapStateToProps, undefined)(DeckButton);
