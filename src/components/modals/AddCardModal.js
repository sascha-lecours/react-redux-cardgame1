import uuid from 'uuid';
import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { connectModal } from 'redux-modal';
import { RenderCard } from '../RenderCard';
import { store } from '../../app';
import { addCardToCampaignDeck } from '../../actions/campaign'


class AddCardModal extends Component {
	dispatchAddCard = (card) => {
		store.dispatch(addCardToCampaignDeck(card));
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
									return <div onClick={() => { this.dispatchAddCard(card); }} key={uuid()}>
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

export default connectModal({ name: 'addCard' })(AddCardModal);
