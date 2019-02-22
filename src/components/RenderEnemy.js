import React from 'react';
import useMove from '../gameData/useMove';

export class RenderEnemy extends React.Component {

	useMoveOnClick = () => {
		useMove(this.props.enemy, this.props.enemy.nextMove);
	};

	render() {
		return (
			<div className="enemy">
				<div className="enemy__name">{`${this.props.enemy.name}`}</div>
				<div className="enemy__hp">{`HP: ${this.props.enemy.hp}/${this.props.enemy.maxHp}`}</div>
				<div className="enemy_defense">{`Defense: ${this.props.enemy.defense}`}</div>
				{
					this.props.enemy.nextMove &&
					<div className="enemy__next-move">{this.props.enemy.nextMove.name}</div>
				}
				{
					this.props.enemy.flavourText &&
					<div className="enemy__flavour-text">{this.props.enemy.flavourText}</div>
				}
				{this.props.enemy.toughness !== 0 && <div className="enemy_toughness">{`Toughness: ${this.props.enemy.toughness}`}</div>}
				{this.props.enemy.strength !== 0 && <div className="enemy_strength">{`Strength: ${this.props.enemy.strength}`}</div>}
				{
					(this.props.enemy.marked > 0) &&
					<div className="enemy__targeted">{`Marked: ${this.props.enemy.marked}` }</div>
				}
				<button onClick={this.useMoveOnClick}> Use Move </button>
			</div>
		);
	}
}

export default RenderEnemy;
