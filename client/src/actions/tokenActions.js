import Axios from 'axios'

const apiUrl = 'http://localhost:8080/api'

export const updateToken = token => dispatch => {
	dispatch({
		type: 'UPDATE_TOKEN',
		payload: token,
	})
}

export const retrieveUser = user => dispatch => {
	dispatch({
		type: 'RETRIEVE_USER',
		payload: user,
	})
}

export const fetchUser = token => dispatch => {
	console.log(token)
	Axios.get(apiUrl + '/login', { headers: { 'Api-Key': token } }).then(res => {
		console.log(res)
		dispatch(retrieveUser(res.data.user))
	})
}
