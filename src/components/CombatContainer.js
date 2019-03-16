import React from 'react';
import HandDisplay from './HandDisplay';
import DeckButton from './DeckButton';
import DiscardPileButton from './DiscardPileButton';
import EnemiesArea from './EnemiesArea';
import PlayerArea from './PlayerArea';
import TurnController from '../gameData/turnController';
import BootstrapModal from '../playground/modals';

export default () => {
	return (
		<div className="combat-container">
			<EnemiesArea />
			<div>
				<PlayerArea />
				<DeckButton />
				<BootstrapModal />
				<DiscardPileButton />
			</div>
			<HandDisplay />
			<TurnController />
		</div>
	);
};
