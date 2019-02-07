import { connect } from 'react-redux'
import NavBar from './NavBar'

const mapStateToProps = state => {
	return {}
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
