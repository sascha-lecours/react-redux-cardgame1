import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { connectModal } from 'redux-modal';
import { RenderCard } from '../RenderCard';

class DiscardModal extends Component {
	render() {
		const { show, handleHide, discard } = this.props;

		return (
			<Modal show={show} onHide={handleHide}>
				<Modal.Header>
					<Modal.Title className="discard__modal__title">Discards</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<div className="discard__modal">
						{
							discard.length === 0 ? (
								<div>
									<span>No cards in Discard pile!</span>
								</div>
							) : (
								discard.map((card) => {
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

export default connectModal({ name: 'discard' })(DiscardModal);
