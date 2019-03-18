import React from 'react';
// import { connect } from 'react-redux';

export default (props) => {
	const { player } = props;
	return (
		<div className="player">
			<div className="player__name">{`${player.name}`}</div>
			<img className="player__portrait" alt={`${player.name}`} src={player.portrait} />
			<div className="player__hp">{`HP: ${player.hp}/${player.maxHp}`}</div>
			<div className="player__defense">{`Defense: ${player.defense}`}</div>
			{player.toughness !== 0 && <div className="player__toughness">{`Toughness: ${player.toughness}`}</div>}
			{player.strength !== 0 && <div className="player__strength">{`Strength: ${player.strength}`}</div>}
			{player.poison !== 0 && <div className="player__poison">{`Poison: ${player.poison}`}</div>}
		</div>
	);
};


// const mapStateToProps = (state) => {
// 	return {
// 		player: state.game.playerGroup,
// 	};
// };

// export default connect(mapStateToProps, undefined)(RenderPlayer);
