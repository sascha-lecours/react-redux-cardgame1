import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { connectModal } from 'redux-modal';
import { RenderCard } from '../RenderCard';

class DeckModal extends Component {
	render() {
		const { show, handleHide, deck } = this.props;

		return (
			<Modal show={show} onHide={handleHide}>
				<Modal.Header>
					<Modal.Title className=".deck__modal__title">Deck</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<div className="deck__modal">
						{
							deck.length === 0 ? (
								<div>
									<span>No cards in Deck!</span>
								</div>
							) : (
								deck.map((card) => {
									return <RenderCard card={card} key={card.id} />;
								})
							)
						}
					</div>
				</Modal.Body>

				<Modal.Footer>
					<Button onClick={handleHide}>Close</Button>
				</Modal.Footer>
			</Modal>
		);
	}
}

export default connectModal({ name: 'deck' })(DeckModal);
