import React from 'react';
import { connect } from 'react-redux';

const RenderPlayer = (props) => {
	return (
		<div className="player">
			<div className="player__name">{`${props.player.name}`}</div>
			{props.player.hp && <div className="player__hp">{`HP: ${props.player.hp}/${props.player.maxHp}`}</div>}
			<div className="enemy_defense">{`Defense: ${props.player.defense}`}</div>
		</div>
	);
};


const mapStateToProps = (state) => {
	return {
		player: state.player,
	};
};

export default connect(mapStateToProps, undefined)(RenderPlayer);
