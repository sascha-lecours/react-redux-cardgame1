import React from 'react';
// import { connect } from 'react-redux';

export default (props) => {
	return (
		<div className="player">
			<div className="player__name">{`${props.player.name}`}</div>
			<div className="player__hp">{`HP: ${props.player.hp}/${props.player.maxHp}`}</div>
			<div className="player_defense">{`Defense: ${props.player.defense}`}</div>
			{props.player.toughness !== 0 && <div className="player_toughness">{`Toughness: ${props.player.toughness}`}</div>}
			{props.player.strength !== 0 && <div className="player_strength">{`Strength: ${props.player.strength}`}</div>}
		</div>
	);
};


// const mapStateToProps = (state) => {
// 	return {
// 		player: state.game.playerGroup,
// 	};
// };

// export default connect(mapStateToProps, undefined)(RenderPlayer);
