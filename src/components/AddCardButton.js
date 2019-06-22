import React, { Component } from 'react';
import { connect } from 'react-redux';
import { show } from 'redux-modal';
import { Button } from 'react-bootstrap';

export class AddCardButton extends Component {


	handleAddCardOpen = (name, slot) => () => {
		if (slot===1) {
			this.props.show(name, {potentialCards: this.props.potentialCards1});
		} else if (slot === 2) {
			this.props.show(name, {potentialCards: this.props.potentialCards2});
		}
	};

	render() {
		return (
			<div>
				<Button bsstyle="primary" onClick={this.handleAddCardOpen(`addCard${this.props.slot}`, this.props.slot)}>
					{`Add a new card! ${this.props.slot}`}
				</Button>
			</div>
		);
	};
};

const mapStateToProps = (state) => {
	return {
		potentialCards1: state.campaign.potentialCards1,
		potentialCards2: state.campaign.potentialCards2,
	};
};

const mapDispatchToProps = (dispatch, props) => ({
	show: (name, props) => dispatch(show(name,props)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddCardButton);
