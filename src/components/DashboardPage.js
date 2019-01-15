import React from 'react';
import RenderCard from './RenderCard';
import CombatContainer from './CombatContainer';
import { testCard1, testCard2 } from '../gameData/cardList';

const DashboardPage = () => (
	<CombatContainer />
);

// <div>
// 	<RenderCard card={testCard1} />
// 	<RenderCard card={testCard2} />
// </div>

export default DashboardPage;
