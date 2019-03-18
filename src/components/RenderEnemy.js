import React from 'react';
import useMove from '../gameData/useMove';

export class RenderEnemy extends React.Component {

	// This function is no longer in use and will be phased out later
	// useMoveOnClick = () => {
	// 	useMove(this.props.enemy, this.props.enemy.nextMove);
	// };

	getClassName = (enemy) => {
		let workingClassName = "enemy";
		if(enemy.highlighted) {workingClassName = workingClassName + " enemy__highlighted"};
		if(enemy.shaking) {workingClassName = workingClassName + " shake-hard shake-constant"};
		return workingClassName;
	}


	render() {
		const { enemy } = this.props;
		return (
			<div className={this.getClassName(enemy)}>
				<div className="enemy__name">{`${enemy.name}`}</div>
				<img className="enemy__portrait" alt={`${enemy.name}`} src={enemy.portrait} />
				<div className="enemy__hp">{`HP: ${enemy.hp}/${enemy.maxHp}`}</div>
				<div className="enemy__defense">{`Defense: ${enemy.defense}`}</div>
				{
					this.props.enemy.flavourText &&
					<div className="enemy__flavour-text">{enemy.flavourText}</div>
				}
				{enemy.toughness !== 0 && <div className="enemy__toughness">{`Toughness: ${enemy.toughness}`}</div>}
				{enemy.strength !== 0 && <div className="enemy__strength">{`Strength: ${enemy.strength}`}</div>}
				{
					(enemy.marked > 0) &&
					<div className="enemy__marked">{`Marked: ${enemy.marked}` }</div>
				}
				{
					(enemy.poison > 0) &&
					<div className="enemy__poison">{`Poison: ${enemy.poison}` }</div>
				}
				{
					enemy.nextMove &&
					<div className="enemy__next-move">{enemy.nextMove.name}</div>
				}
			{/* <button onClick={this.useMoveOnClick}> Use Move </button> */}
			</div>
		);
	}
}

export default RenderEnemy;
