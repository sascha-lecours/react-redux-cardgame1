import React from 'react';
import HandDisplay from './HandDisplay';
import DeckButton from './DeckButton';
import { testCard1, testCard2 } from '../gameData/cardList';

const EnemyArea = (props) => {
	return (
		<div> Enemies go here </div>
	);
};

const PlayerStatus = (props) => {
	return (
		<div>{'HP: 5/5 Armor: 3'}</div>
	);
};

const DiscardButton = (props) => {
	return (
		<div>Discard</div>
	);
};

export default () => {
	return (
		<div>
			<EnemyArea />
			<div>
				<DeckButton />
				<PlayerStatus />
				<DiscardButton />
			</div>
			<HandDisplay />
		</div>
	);
};
