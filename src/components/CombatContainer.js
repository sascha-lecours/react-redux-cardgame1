import React from 'react';
import HandDisplay from './HandDisplay';
import DeckButton from './DeckButton';
import DiscardPileButton from './DiscardPileButton';
import EnemiesArea from './EnemiesArea';
import PlayerArea from './PlayerArea';
import TurnController from '../gameData/turnController';
import DeckModal from './modals/DeckModal';
import DiscardModal from './modals/DiscardModal';

export default () => {
	return (
		<div className="combat-container">
			<EnemiesArea />
			<div className="combat-container__player-and-deck-area">
				<PlayerArea />
				<div>
					<DeckButton />
					<DeckModal />
					<DiscardPileButton />
					<DiscardModal />
				</div>
			</div>
			<HandDisplay />
			<TurnController />
		</div>
	);
};
