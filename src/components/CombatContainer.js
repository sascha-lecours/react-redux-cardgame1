import React from 'react';
import HandDisplay from './HandDisplay';
import DeckButton from './DeckButton';
import DiscardPileButton from './DiscardPileButton';
import EnemiesArea from './EnemiesArea';
import PlayerArea from './PlayerArea';

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
		</div>
	);
};
