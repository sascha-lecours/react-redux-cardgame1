import React from 'react';
import { connect } from 'react-redux';
import RenderPlayer from './RenderPlayer';


export const PlayerDisplay = (props) => {
	return (
		// Add a  button inside the enemy container that, when pressed, sets new moves for all enemies
		<div className="players-area">
			{			
				props.playerGroup.length === 0 ? (
					<div>
						<span>No Player!</span>
					</div>
				) : (
					props.playerGroup.map((player) => {
						return <RenderPlayer player={player} key={player.id} />;
					})
				)
			}
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		playerGroup: state.game.playerGroup,
	};
};

export default connect(mapStateToProps, undefined)(PlayerDisplay);
