import React from 'react';
import HandDisplay from './HandDisplay';
import DeckButton from './DeckButton';
import DiscardPileButton from './DiscardPileButton';
import EnemiesArea from './EnemiesArea';
import PlayerArea from './PlayerArea';
import TurnController from '../gameData/turnController';
import DeckModal from './modals/DeckModal';

export default () => {
	return (
		<div className="combat-container">
			<EnemiesArea />
			<div>
				<PlayerArea />
				<DeckButton />
				<DeckModal />
				<DiscardPileButton />
			</div>
			<HandDisplay />
			<TurnController />
		</div>
	);
};
