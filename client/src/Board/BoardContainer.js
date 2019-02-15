import { connect } from 'react-redux'

import { tokenSelectors, activitiesSelectors } from '../selectors'
import Board from './Board'

const mapStateToProps = state => {
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
