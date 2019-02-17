import { connect } from 'react-redux'

import { tokenSelectors } from '../selectors'
import Activity from './Activity'

const mapStateToProps = state => {
	return {
		token: tokenSelectors.tokenSelector(state),
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
)(Activity)
