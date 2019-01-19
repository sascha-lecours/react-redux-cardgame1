import React from 'react';
import { connect } from 'react-redux';

export const DiscardPileButton = (props) => {
	return (
		<div>
			<button>Discards: {props.discard.length}</button>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		discard: state.cards.discard,
	};
};

export default connect(mapStateToProps)(DiscardPileButton);
