import React from 'react';
import { connect } from 'react-redux';
import RenderEnemy from './RenderEnemy';
import { setNewMove } from '../actions/enemies';


export const EnemiesDisplay = (props) => {
	return (
		// Add a  button inside the enemy container that, when pressed, sets new moves for all enemies
		<div className="enemies-area">
			{			
				props.enemyGroup.length === 0 ? (
					<div>
						<span>No enemies</span>
					</div>
				) : (
					props.enemyGroup.map((enemy) => {
						return <RenderEnemy enemy={enemy} key={enemy.id} />;
					})
				)
			}
			{/* <button onClick={() => props.setNewMoves(props.enemyGroup)}> New moves </button> */}
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		enemyGroup: state.game.enemyGroup,
	};
};

// const mapDispatchToProps = (dispatch, props) => ({
// 	setNewMoves: (enemyGroup) => { enemyGroup.forEach(element => {
// 			dispatch(setNewMove(element));
// 		}); 
// 	},
// });

export default connect(mapStateToProps, undefined)(EnemiesDisplay);
