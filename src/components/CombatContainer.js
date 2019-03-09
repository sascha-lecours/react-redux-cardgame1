import React from 'react';
import HandDisplay from './HandDisplay';
import DeckButton from './DeckButton';
import DiscardPileButton from './DiscardPileButton';
import EnemiesArea from './EnemiesArea';
import PlayerArea from './PlayerArea';
import TurnController from '../gameData/turnController';

export default () => {
	return (
		<div className="combat-container">
			<EnemiesArea />
			<div>
				<PlayerArea />
				<DeckButton />
				<DiscardPileButton />
			</div>
			<HandDisplay />
			<TurnController />
		</div>
	);
};
