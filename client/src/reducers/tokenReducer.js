export default (state = {}, action) => {
	switch (action.type) {
		case 'UPDATE_TOKEN':
			return {
				token: action.payload,
			}
		case 'RETRIEVE_USER':
			return {
				user: action.payload,
			}
		default:
			return state
	}
}
