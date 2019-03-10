import React from 'react';
// import { connect } from 'react-redux';

export default (props) => {
	return (
		<div className="player">
			<div className="player__name">{`${props.player.name}`}</div>
			<div className="player__hp">{`HP: ${props.player.hp}/${props.player.maxHp}`}</div>
			<div className="player__defense">{`Defense: ${props.player.defense}`}</div>
			{props.player.toughness !== 0 && <div className="player__toughness">{`Toughness: ${props.player.toughness}`}</div>}
			{props.player.strength !== 0 && <div className="player__strength">{`Strength: ${props.player.strength}`}</div>}
			{props.player.poison !== 0 && <div className="player__poison">{`Poison: ${props.player.poison}`}</div>}
		</div>
	);
};


// const mapStateToProps = (state) => {
// 	return {
// 		player: state.game.playerGroup,
// 	};
// };

// export default connect(mapStateToProps, undefined)(RenderPlayer);
