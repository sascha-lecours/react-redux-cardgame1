import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { connectModal } from 'redux-modal';
import { RenderCard } from '../RenderCard';

class AddCardModal extends Component {
	render() {
		const { show, handleHide, potentialCards } = this.props;

		return (
			<Modal show={show} onHide={handleHide}>
				<Modal.Header>
					<Modal.Title className="addCard__modal__title">Add a new card!</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<div className="addCard__modal">
						{
							potentialCards.length === 0 ? (
								<div>
									<span>No cards to add!</span>
								</div>
							) : (
								potentialCards.map((card) => {
									return <RenderCard card={card} key={card.id} />;
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
