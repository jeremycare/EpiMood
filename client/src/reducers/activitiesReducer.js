export default (state = {}, action) => {
	switch (action.type) {
		case 'RETRIEVE_ACTIVITIES':
			console.log('retrieve', action.payload)
			return {
				activities: action.payload,
			}
		default:
			return state
	}
}
