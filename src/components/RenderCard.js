import React from 'react';
import { connect } from 'react-redux';
import { discardCard } from '../actions/cards';

export class RenderCard extends React.Component {
	onClick = () => {
		this.props.discardCard(this.props.card);
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
				<button onClick={this.onClick}> Discard </button>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch, props) => ({
	discardCard: ({ id }) => dispatch(discardCard({ id })),
});

export default connect(undefined, mapDispatchToProps)(RenderCard);
