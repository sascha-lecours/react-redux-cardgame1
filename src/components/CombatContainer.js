import React from 'react';
import HandDisplay from './HandDisplay';
import DeckButton from './DeckButton';
import DiscardPileButton from './DiscardPileButton';
import { testCard1, testCard2 } from '../gameData/cardList';
import EnemiesArea from './EnemiesArea';


const PlayerStatus = (props) => {
	return (
		<div>{'HP: 5/5 Armor: 3'}</div>
	);
};

export default () => {
	return (
		<div>
			<EnemiesArea />
			<div>
				<DeckButton />
				<PlayerStatus />
				<DiscardPileButton />
			</div>
			<HandDisplay />
		</div>
	);
};
