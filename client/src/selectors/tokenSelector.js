export const tokenSelector = state => {
	return state.token ? state.token.user.token : undefined
}

export const userSelector = state => {
	return state.token ? state.token.user : undefined
}
