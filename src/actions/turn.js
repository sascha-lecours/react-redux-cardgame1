
// ADVANCE_PHASE
export const advancePhase = () => {
	return {
		type: 'ADVANCE_PHASE',
	};
};


// SET_PHASE
export const setPhase = (phase) => {
	return {
		type: 'SET_PHASE',
		phase,
	};
};
