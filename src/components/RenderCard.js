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
		playCard(this.props.card);
	}

	render() {
		return (
			<div className="card">
				<div className="card__name">{`Name: ${this.props.card.name}`}</div>
				<div>{`Type: ${this.props.card.type}`}</div>
				{this.props.card.stats.attack && <div>{`Attack: ${this.props.card.stats.attack}`}</div>}
				{this.props.card.stats.defense && <div>{`Defense: ${this.props.card.stats.defense}`}</div>}
				{this.props.card.specialText && <div className="card__special-text">{this.props.card.specialText}</div>}
				{this.props.card.flavourText && <div className="card__flavour-text">{this.props.card.flavourText}</div>}
				<button onClick={this.playOnClick}> Play </button>
				<button onClick={this.discardOnClick}> Discard </button>
				<button onClick={this.banishOnClick}> Banish </button>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch, props) => ({
	discardCard: ({ id }) => dispatch(discardCard({ id })),
	banishCard: ({ id }) => dispatch(banishCard({ id })),
});

export default connect(undefined, mapDispatchToProps)(RenderCard);
