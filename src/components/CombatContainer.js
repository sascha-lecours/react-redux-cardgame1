import React from 'react';
import HandDisplay from './HandDisplay';
import DeckButton from './DeckButton';
import DiscardPileButton from './DiscardPileButton';
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

export default () => {
	return (
		<div>
			<EnemyArea />
			<div>
				<DeckButton />
				<PlayerStatus />
				<DiscardPileButton />
			</div>
			<HandDisplay />
		</div>
	);
};
