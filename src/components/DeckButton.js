import React, { Component } from 'react';
import { connect } from 'react-redux';
import { show } from 'redux-modal';
import { Button } from 'react-bootstrap';

export class DeckButton extends Component {

	handleDeckOpen = (name, deck) => () => {
		this.props.show(name, {
			deck,
		})
	};

	render() {
		return (
			<div>
				<Button bsstyle="primary" onClick={this.handleDeckOpen('deck', this.props.deck)}>
					Deck: {this.props.deck.length}
				</Button>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		deck: state.game.deck,
	};
};


const mapDispatchToProps = (dispatch, props) => ({
	show: (name, props) => dispatch(show(name,props)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DeckButton);
