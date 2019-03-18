import React from 'react';
// import { connect } from 'react-redux';

export class RenderPlayer extends React.Component {
	
	getClassName = (player) => {
		let workingClassName = "player";
		if(player.highlighted) {workingClassName = workingClassName + " player__highlighted"};
		if(player.isActive) {workingClassName = workingClassName + " player__is-active"};
		if(player.shaking) {workingClassName = workingClassName + " shake-hard shake-constant"};
		return workingClassName;
	}

	render() {
		const { player } = this.props;
		return (
			
			<div className={this.getClassName(player)}>
				<div className="player__name">{`${player.name}`}</div>
				<img className="player__portrait" alt={`${player.name}`} src={player.portrait} />
				<div className="player__hp">{`HP: ${player.hp}/${player.maxHp}`}</div>
				<div className="player__defense">{`Defense: ${player.defense}`}</div>
				{player.toughness !== 0 && <div className="player__toughness">{`Toughness: ${player.toughness}`}</div>}
				{player.strength !== 0 && <div className="player__strength">{`Strength: ${player.strength}`}</div>}
				{player.poison !== 0 && <div className="player__poison">{`Poison: ${player.poison}`}</div>}
			</div>
		);
	}
};


export default RenderPlayer;

// const mapStateToProps = (state) => {
// 	return {
// 		player: state.game.playerGroup,
// 	};
// };

// export default connect(mapStateToProps, undefined)(RenderPlayer);
