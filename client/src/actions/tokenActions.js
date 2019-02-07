export const updateToken = token => dispatch => {
	dispatch({
		type: 'UPDATE_TOKEN',
		payload: token,
	})
}
