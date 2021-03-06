import { connect } from 'react-redux'
import NavBar from './NavBar'
import { tokenSelectors } from '../selectors'

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
)(NavBar)
