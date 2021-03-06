import React from 'react';

export class RenderEnemy extends React.Component {

	getClassName = (enemy) => {
		let workingClassName = "enemy";
		if(enemy.highlighted) {workingClassName = workingClassName + " enemy__highlighted"};
		if(enemy.isActive) {workingClassName = workingClassName + " enemy__is-active"};
		if(enemy.shaking) {workingClassName = workingClassName + " shake-hard shake-constant"};
		if(enemy.isPulsing) {workingClassName = workingClassName + " enemy__is-pulsing"};
		return workingClassName;
	}


	render() {
		const { enemy } = this.props;
		return (
			<div className={this.getClassName(enemy)}>
				<div className="enemy__name">{`${enemy.name}`}</div>
				<div className="enemy__portrait-box"><img className="enemy__portrait" alt={`${enemy.name}`} src={enemy.portrait} /></div>
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
				{
					(enemy.nextMove.type == 'attack') &&
					<div className="enemy__next-move">{`${enemy.nextMove.damageString(enemy, enemy.nextMove)} damage`}</div>
				}
			</div>
		);
	}
}

export default RenderEnemy;
