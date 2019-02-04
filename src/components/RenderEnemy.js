import React from 'react';

const RenderEnemy = (props) => {
	return (
		<div className="enemy">
			<div className="enemy__name">{`${props.enemy.name}`}</div>
			{props.enemy.stats.hp && <div className="enemy__hp">{`HP: ${props.enemy.stats.hp}/${props.enemy.stats.maxHp}`}</div>}
			{props.enemy.stats.defense && <div className="enemy_defense">{`Defense: ${props.enemy.stats.defense}`}</div>}
			{
				props.enemy.nextMove &&
				<div className="enemy__next-move">{props.enemy.nextMove.name}</div>
			}
			{
				props.enemy.flavourText &&
				<div className="enemy__flavour-text">{props.enemy.flavourText}</div>
			}
		</div>
	);
};


export default RenderEnemy;
