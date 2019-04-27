import React from 'react';
import { connect } from 'react-redux';
import { discardCard, banishCard, forbidPlayerToPlayCards } from '../actions/cards';
import { advancePhase } from '../actions/turn';
import playCard from '../gameData/playCard';
import { Button } from 'react-bootstrap';
import { playCardPhase } from '../gameData/turnController';


export class RenderCard extends React.Component {


	discardOnClick = () => {
		this.props.discardCard(this.props.card);
	}
	banishOnClick = () => {
		this.props.banishCard(this.props.card);
	}
	playOnClick = async () => {
		// Todo: this probably needs to be refactored/moved
		if(this.props.phase === playCardPhase && this.props.playerCanPlayCards) {
			this.props.forbidPlayerToPlayCards();
			await playCard(this.props.player, this.props.card);
			this.props.advancePhase();
		};
	}

	getClassName = (card) => {
		let workingClassName = "card";
		if(card.highlighted) {workingClassName = workingClassName + " card__highlighted"};
		if(card.isActive) {workingClassName = workingClassName + " card__is-active"};
		if(card.shaking) {workingClassName = workingClassName + " shake-hard shake-constant"};
		return workingClassName;
	}

	getUnplayedClassName = (card) => {
		let workingClassName = "card__unplayed";
		if(card.highlightUnplayed) {workingClassName = workingClassName + " card__unplayed__highlighted"};
		return workingClassName;
	}

	render() {
		const { card, inHand, player } = this.props;
		return (
			<div onClick={this.playOnClick} className={this.getClassName(card)}>
				<div className="card__name">{`${card.name}`}</div>
				<div className="card__type">{card.type}</div>
				{/*{card.attack && <div>{`Attack: ${card.attack}`}</div>}
				{card.defense && <div>{`Defense: ${card.defense}`}</div>} */}
				{card.specialText && <div className="card__special-text">{card.specialText(player)}</div>}
				{card.flavourText && <div className="card__flavour-text">{card.flavourText}</div>}
				{/*inHand && <Button > Play </Button>*/}
				{card.unplayedEffects.length > 0 && <div className={this.getUnplayedClassName(card)}>
				{card.unplayedSpecialText && <div className="card__unplayed-special-text">Unplayed: {card.unplayedSpecialText(player)}</div>}
				</div>}
				{/* <button onClick={this.discardOnClick}> Discard </button>
					<button onClick={this.banishOnClick}> Banish </button> */}
			</div>
		);
	}
}

// Setting default props via static property.
RenderCard.	defaultProps = {
	inHand: false,
}

// Currently always points to player 1. This could be changed later on, if larger parties are implemented
const mapStateToProps = (state) => {
	return {
		player: state.game.playerGroup[0],
		phase: state.turn.phase,
		playerCanPlayCards: state.game.playerCanPlayCards,
	};
};

const mapDispatchToProps = (dispatch, props) => ({
	discardCard: ({ id }) => dispatch(discardCard({ id })),
	banishCard: ({ id }) => dispatch(banishCard({ id })),
	advancePhase: () => dispatch(advancePhase()),
	forbidPlayerToPlayCards: () => dispatch(forbidPlayerToPlayCards()),
});

export default connect(mapStateToProps, mapDispatchToProps)(RenderCard);
