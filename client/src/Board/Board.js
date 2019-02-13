import React from 'react'
import { useEffect } from 'react'
import { Avatar, Card, Timeline } from 'antd'

import { tokenActions, activitiesActions } from '../actions'
import NavBarContainer from '../NavBar/NavBarContainer'
import Activity from './Activity'

import './Board.css'

const Board = props => {
	useEffect(() => {
		props.dispatch(tokenActions.fetchUser(props.match.params.token))
		props.dispatch(activitiesActions.fetchActivities(props.match.params.token))
	}, [])

	const user = props.user
	const activities = props.activities
	return (
		<div className="Board">
			<NavBarContainer />
			<Timeline pending>
				{activities
					? activities.map((activity, i) => (
							<Activity
								key={i}
								title={activity.name}
								date={activity.date}
								feedbacks={activity.feedbacks}
							/>
					  ))
					: ''}
			</Timeline>
		</div>
	)
}

export default Board
