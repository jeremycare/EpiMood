import { connect } from 'react-redux'

import { tokenSelectors, activitiesSelectors } from '../selectors'
import Board from './Board'

const mapStateToProps = state => {
	console.log('token selector', tokenSelectors.tokenSelector(state))
	console.log('user selector', tokenSelectors.userSelector(state))
	console.log(
		'activities selector',
		activitiesSelectors.activitiesSelector(state)
	)
	return {
		token: tokenSelectors.tokenSelector(state),
		user: tokenSelectors.userSelector(state),
		activities: activitiesSelectors.activitiesSelector(state),
	}
}

const mapDispatchToProps = dispatch => {
	return {
		dispatch: dispatch,
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Board)
