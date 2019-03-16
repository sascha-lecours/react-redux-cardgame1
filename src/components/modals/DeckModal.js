import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { connectModal } from 'redux-modal';

class DeckModal extends Component {
	render() {
		const { show, handleHide, message } = this.props;

		return (
			<Modal show={show}>
				<Modal.Header>
					<Modal.Title>Deck</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					{ message }
				</Modal.Body>

				<Modal.Footer>
					<Button onClick={handleHide}>Close</Button>
					<Button bsstyle="primary" onClick={this.handleClose}>Save changes</Button>
				</Modal.Footer>
			</Modal>
		);
	}
}

export default connectModal({ name: 'deck' })(DeckModal);
