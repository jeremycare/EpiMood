import React from 'react'
import { useEffect } from 'react'

import { tokenActions } from '../actions'
import NavBarContainer from '../NavBar/NavBarContainer'

const Board = props => {
	useEffect(() => {
		return props.dispatch(tokenActions.fetchUser(props.match.params.id))
	}, [])

	const user = props.state ? props.state.user : undefined
	return (
		<div className="Board">
			<NavBarContainer />
			<div>{user ? user.email : ''}</div>
		</div>
	)
}

export default Board
