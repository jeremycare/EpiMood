import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers/index'

export default function configureStore(
	initialState = {
		token: null,
	}
) {
	return createStore(rootReducer, initialState, applyMiddleware(thunk))
}
