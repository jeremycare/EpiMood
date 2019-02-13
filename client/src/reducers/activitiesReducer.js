export default (state = {}, action) => {
	switch (action.type) {
		case 'RETRIEVE_ACTIVITIES':
			return {
				activities: action.payload,
			}
		default:
			return state
	}
}
