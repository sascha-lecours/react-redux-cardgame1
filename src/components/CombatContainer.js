import React from 'react';
import HandDisplay from './HandDisplay';
import DeckButton from './DeckButton';
import DiscardPileButton from './DiscardPileButton';
import { testCard1, testCard2 } from '../gameData/cardList';
import EnemiesArea from './EnemiesArea';
import RenderPlayer from './RenderPlayer';

export default () => {
	return (
		<div>
			<EnemiesArea />
			<div>
				<DeckButton />
				<RenderPlayer />
				<DiscardPileButton />
			</div>
			<HandDisplay />
		</div>
	);
};
