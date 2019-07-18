import React from 'react';
import { connect } from 'react-redux';
import AddCardButton from './AddCardButton';
import { AddCardModal1, AddCardModal2 } from './modals/AddCardModal';
import { setPotentialNewCards } from '../actions/campaign';
import { testCards } from '../gameData/cardList';

export class VictoryPage extends React.Component {

	componentDidMount() {
		this.props.setPotentialNewCards(5, testCards, 1);
		this.props.setPotentialNewCards(5, testCards, 2);
	}

	render() {
		return (
			<div>
				<p className="victory">You have survived this fight! Prepare for the next!</p>
				{this.props.campaign.card1ToAdd && <AddCardButton slot={1} /> }
				<AddCardModal1 slot={1} />
				{this.props.campaign.card2ToAdd && <AddCardButton slot={2} /> }
				<AddCardModal2 slot={2} />
			</div>
		);
	}
}


const mapStateToProps = (state, props) => ({
	campaign: state.campaign,
});

const mapDispatchToProps = (dispatch, props) => ({
	setPotentialNewCards: (number, set, slot) => dispatch(setPotentialNewCards(number, set, slot)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VictoryPage);
