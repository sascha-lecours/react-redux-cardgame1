import uuid from 'uuid';
import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { connectModal } from 'redux-modal';
import { RenderCard } from '../RenderCard';
import { store } from '../../app';
import { addCardToCampaignDeck } from '../../actions/campaign';


class AddCardModal extends Component {
	dispatchAddCard = (card, slot) => {
		store.dispatch(addCardToCampaignDeck(card, slot));
	}

	render() {
		const { show, handleHide, potentialCards } = this.props;

		return (
			<Modal show={show} onHide={handleHide}>
				<Modal.Header>
					<Modal.Title className="add-card__modal__title">Add a new card!</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<div className="add-card__modal">
						{
							potentialCards.length === 0 ? (
								<div>
									<span>No cards to add!</span>
								</div>
							) : (
								potentialCards.map((card) => {
									return <div onClick={() => {
										this.dispatchAddCard(card, this.props.slot); 
										handleHide(); 
									}} key={uuid()}>
										<RenderCard card={card} key={card.id} />
									</div>;
								})
							)
						}
					</div>
				</Modal.Body>

				<Modal.Footer>
					<Button onClick={handleHide}>Skip</Button>
				</Modal.Footer>
			</Modal>
		);
	}
}

export const AddCardModal1 = connectModal({ name: 'addCard1' })(AddCardModal);
export const AddCardModal2 = connectModal({ name: 'addCard2' })(AddCardModal);

// export default connectModal({ name: 'addCard1' })(AddCardModal);