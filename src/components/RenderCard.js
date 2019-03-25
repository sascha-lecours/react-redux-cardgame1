import React from 'react';
import { connect } from 'react-redux';
import { discardCard, banishCard } from '../actions/cards';
import { advancePhase } from '../actions/turn';
import playCard from '../gameData/playCard';
import { Button } from 'react-bootstrap';


export class RenderCard extends React.Component {


	discardOnClick = () => {
		this.props.discardCard(this.props.card);
	}
	banishOnClick = () => {
		this.props.banishCard(this.props.card);
	}
	playOnClick = async () => {
		// Todo: this probably needs to be refactored/moved
		await playCard(this.props.player, this.props.card);
		this.props.advancePhase();
	}

	getClassName = (card) => {
		let workingClassName = "card";
		if(card.highlighted) {workingClassName = workingClassName + " card__highlighted"};
		if(card.isActive) {workingClassName = workingClassName + " card__is-active"};
		if(card.shaking) {workingClassName = workingClassName + " shake-hard shake-constant"};
		return workingClassName;
	}

	render() {
		const { card, inHand } = this.props;
		return (
			<div className={this.getClassName(card)}>
				<div className="card__name">{`${card.name}`}</div>
				<div>{`Type: ${card.type}`}</div>
				{/*{card.attack && <div>{`Attack: ${card.attack}`}</div>}
				{card.defense && <div>{`Defense: ${card.defense}`}</div>} */}
				{card.specialText && <div className="card__special-text">{card.specialText}</div>}
				{card.flavourText && <div className="card__flavour-text">{card.flavourText}</div>}
				{inHand && <Button onClick={this.playOnClick}> Play </Button>}
				{card.unplayedEffects.length > 0 && <div className="card__unplayed">
				{card.unplayedSpecialText && <div className="card__unplayed-special-text">If not played: {card.unplayedSpecialText}</div>}
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
	};
};

const mapDispatchToProps = (dispatch, props) => ({
	discardCard: ({ id }) => dispatch(discardCard({ id })),
	banishCard: ({ id }) => dispatch(banishCard({ id })),
	advancePhase: () => dispatch(advancePhase()),
});

export default connect(mapStateToProps, mapDispatchToProps)(RenderCard);
