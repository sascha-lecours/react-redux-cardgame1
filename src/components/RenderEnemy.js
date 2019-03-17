import React from 'react';
import useMove from '../gameData/useMove';

export class RenderEnemy extends React.Component {

	// This function is no longer in use and will be phased out later
	useMoveOnClick = () => {
		useMove(this.props.enemy, this.props.enemy.nextMove);
	};

	getClassName = (enemy) => {
		let workingClassName = "enemy";
		if(enemy.highlighted) {workingClassName = workingClassName + " enemy__highlighted"};
		return workingClassName;
	}


	render() {
		return (
			<div className={this.getClassName(this.props.enemy)}>
				<div className="enemy__name">{`${this.props.enemy.name}`}</div>
				<div className="enemy__hp">{`HP: ${this.props.enemy.hp}/${this.props.enemy.maxHp}`}</div>
				<div className="enemy__defense">{`Defense: ${this.props.enemy.defense}`}</div>
				{
					this.props.enemy.flavourText &&
					<div className="enemy__flavour-text">{this.props.enemy.flavourText}</div>
				}
				{this.props.enemy.toughness !== 0 && <div className="enemy__toughness">{`Toughness: ${this.props.enemy.toughness}`}</div>}
				{this.props.enemy.strength !== 0 && <div className="enemy__strength">{`Strength: ${this.props.enemy.strength}`}</div>}
				{
					(this.props.enemy.marked > 0) &&
					<div className="enemy__marked">{`Marked: ${this.props.enemy.marked}` }</div>
				}
				{
					(this.props.enemy.poison > 0) &&
					<div className="enemy__poison">{`Poison: ${this.props.enemy.poison}` }</div>
				}
				{
					this.props.enemy.nextMove &&
					<div className="enemy__next-move">{this.props.enemy.nextMove.name}</div>
				}
			{/* <button onClick={this.useMoveOnClick}> Use Move </button> */}
			</div>
		);
	}
}

export default RenderEnemy;
