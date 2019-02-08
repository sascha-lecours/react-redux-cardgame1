import React from 'react';
import HandDisplay from './HandDisplay';
import DeckButton from './DeckButton';
import DiscardPileButton from './DiscardPileButton';
import EnemiesArea from './EnemiesArea';
import RenderPlayer from './RenderPlayer';

export default () => {
	return (
		<div className="combat-container">
			<EnemiesArea />
			<div>
				<RenderPlayer />
				<DeckButton />
				<DiscardPileButton />
			</div>
			<HandDisplay />
		</div>
	);
};
