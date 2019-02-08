import React from 'react'
import { useEffect } from 'react'

import { tokenActions } from '../actions'
import NavBarContainer from '../NavBar/NavBarContainer'

const Board = props => {
	console.log(props)
	useEffect(() => {
		return props.dispatch(tokenActions.updateToken(props.match.params.id))
	}, [])
	return (
		<div className="Board">
			<NavBarContainer />
			<div>{props.state ? props.state.token : ''}</div>
		</div>
	)
}

export default Board
