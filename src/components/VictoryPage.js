import React from 'react';
import { connect } from 'react-redux';
import AddCardButton from './AddCardButton';
import AddCardModal from './modals/AddCardModal';
import { setPotentialNewCards } from '../actions/campaign';
import { testCards } from '../gameData/cardList';

export class VictoryPage extends React.Component {

	componentDidMount() {
		this.props.setPotentialNewCards(5, testCards);
	}

	render() {
		return (
			<div>
				<p className="victory">You have survived this fight! Prepare for the next!</p>
				<AddCardButton />
				<AddCardModal />
			</div>
		);
	}
}


const mapStateToProps = (state, props) => ({
	campaign: state.campaign,
});

const mapDispatchToProps = (dispatch, props) => ({
	setPotentialNewCards: (number, set) => dispatch(setPotentialNewCards(number, set)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VictoryPage);
