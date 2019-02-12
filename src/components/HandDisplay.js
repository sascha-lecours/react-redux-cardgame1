import React from 'react';
import { connect } from 'react-redux';
import RenderCard from './RenderCard';


export const HandDisplay = (props) => {
	return (
		<div className="hand">
			{
				props.hand.length === 0 ? (
					<div>
						<span>No cards in Hand</span>
					</div>
				) : (
					props.hand.map((card) => {
						return <RenderCard card={card} key={card.id} />;
					})
				)
			}
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		hand: state.game.hand,
	};
};

export default connect(mapStateToProps)(HandDisplay);
