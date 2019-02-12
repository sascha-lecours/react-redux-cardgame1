import React from 'react';

const RenderEnemy = (props) => {
	return (
		<div className="enemy">
			<div className="enemy__name">{`${props.enemy.name}`}</div>
			<div className="enemy__hp">{`HP: ${props.enemy.hp}/${props.enemy.maxHp}`}</div>
			<div className="enemy_defense">{`Defense: ${props.enemy.defense}`}</div>
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
