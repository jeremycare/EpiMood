import Axios from 'axios'

const apiUrl = 'http://localhost:8080/api'

export const retrieveActivities = activities => dispatch => {
	dispatch({
		type: 'RETRIEVE_ACTIVITIES',
		payload: activities,
	})
}

export const fetchActivities = token => dispatch => {
	Axios.get(apiUrl + '/activities', { headers: { 'Api-Key': token } }).then(
		res => {
			dispatch(retrieveActivities(res.data.data))
		}
	)
}
