import React, { Component } from 'react';
import { connect } from 'react-redux';
import { show } from 'redux-modal';
import { Button } from 'react-bootstrap';

export class DiscardPileButton extends Component {

	handleDiscardOpen = (name, discard) => () => {
		this.props.show(name, {
			discard,
		})
	};

	render() {
		return (
			<div>
				<Button bsstyle="primary" onClick={this.handleDiscardOpen('discard', this.props.discard)}>
					Discards: {this.props.discard.length}
				</Button>
			</div>
		);
	};
};

const mapStateToProps = (state) => {
	return {
		discard: state.game.discard,
	};
};

const mapDispatchToProps = (dispatch, props) => ({
	show: (name, props) => dispatch(show(name,props)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DiscardPileButton);
