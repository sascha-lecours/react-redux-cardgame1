import React from 'react';
import { connect } from 'react-redux';
import { drawCard } from '../actions/cards';

export const DeckButton = (props) => {
	return (
		<div>
			<button onClick={props.drawCard}>Deck: {props.deck.length}</button>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		deck: state.cards.deck,
	};
};

const mapDispatchToProps = (dispatch, props) => ({
	drawCard: () => dispatch(drawCard()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DeckButton);
