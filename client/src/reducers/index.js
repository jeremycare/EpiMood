import { combineReducers } from 'redux'
import tokenReducer from './tokenReducer'
import activitiesReducer from './activitiesReducer'

export default combineReducers({
	token: tokenReducer,
	activities: activitiesReducer,
})
