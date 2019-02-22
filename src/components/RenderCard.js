import React from 'react';
import { connect } from 'react-redux';
import { discardCard, banishCard } from '../actions/cards';
import playCard from '../gameData/playCard';

export class RenderCard extends React.Component {
	discardOnClick = () => {
		this.props.discardCard(this.props.card);
	}
	banishOnClick = () => {
		this.props.banishCard(this.props.card);
	}
	playOnClick = () => {
		playCard(this.props.player, this.props.card);
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
				<button onClick={this.playOnClick}> Play </button>
				<button onClick={this.discardOnClick}> Discard </button>
				<button onClick={this.banishOnClick}> Banish </button>
			</div>
		);
	}
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
});

export default connect(mapStateToProps, mapDispatchToProps)(RenderCard);
