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

	render() {
		return (
			<div className="card">
				<div className="card__name">{`${this.props.card.name}`}</div>
				<div>{`Type: ${this.props.card.type}`}</div>
				{this.props.card.attack && <div>{`Attack: ${this.props.card.attack}`}</div>}
				{this.props.card.defense && <div>{`Defense: ${this.props.card.defense}`}</div>}
				{this.props.card.specialText && <div className="card__special-text">{this.props.card.specialText}</div>}
				{this.props.card.flavourText && <div className="card__flavour-text">{this.props.card.flavourText}</div>}
				{this.props.inHand && <Button onClick={this.playOnClick}> Play </Button>}
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
