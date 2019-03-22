import React, { Component } from 'react';
import { connect } from 'react-redux';
import { show } from 'redux-modal';
import { Button } from 'react-bootstrap';
import DeckModal from '../components/modals/DeckModal';

export class DeckButton extends Component {

	handleDeckOpen = (name, deck) => () => {
		this.props.show(name, {
			message: `This is a ${name} modal`,
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

// Previously, this button also had: onClick={props.drawCard}

const mapStateToProps = (state) => {
	return {
		deck: state.game.deck,
	};
};


const mapDispatchToProps = (dispatch, props) => ({
	show: (name, props) => dispatch(show(name,props)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DeckButton);
