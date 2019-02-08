import { connect } from 'react-redux'

import { tokenSelectors } from '../selectors'
import Board from './Board'

const mapStateToProps = state => {
	return {
		state: tokenSelectors.tokenSelector(state),
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
