export default (state = {}, action) => {
	switch (action.type) {
		case 'UPDATE_TOKEN':
			return {
				token: action.payload,
			}
		default:
			return state
	}
}
