import React from 'react';
import { connect } from 'react-redux';

export class GameOverPage extends React.Component {

	onClick = () => {
		this.props.history.push('/');
	  };

	render() {
		return (
			<div>
				<p className="game-over">Alas, thou art slain!</p>
				<button onClick={this.onClick}>Try Again</button>
			</div>
		);
	}
};

const mapDispatchToProps = (dispatch) => ({
});

export default connect(undefined, mapDispatchToProps)(GameOverPage);
