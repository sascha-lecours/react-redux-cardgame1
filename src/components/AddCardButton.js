import React, { Component } from 'react';
import { connect } from 'react-redux';
import { show } from 'redux-modal';
import { Button } from 'react-bootstrap';

export class AddCardButton extends Component {

	handleAddCardOpen = (name, potentialCards) => () => {
		this.props.show(name, {potentialCards})
	};

	render() {
		return (
			<div>
				<Button bsstyle="primary" onClick={this.handleAddCardOpen('addCard', this.props.potentialCards)}>
					Add new card!
				</Button>
			</div>
		);
	};
};

const mapStateToProps = (state) => {
	return {
		potentialCards: state.campaign.potentialCards,
	};
};

const mapDispatchToProps = (dispatch, props) => ({
	show: (name, props) => dispatch(show(name,props)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddCardButton);
