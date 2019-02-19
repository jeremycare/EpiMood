import React from 'react'
import { useEffect } from 'react'
import { Timeline } from 'antd'

import { tokenActions, activitiesActions } from '../actions'
import NavBarContainer from '../NavBar/NavBarContainer'
import ActivityContainer from './ActivityContainer'
import AdminBoard from './AdminBoard'

import './Board.css'
import AdminBoardContainer from './AdminBoardContainer'

const Board = props => {
	useEffect(() => {
		props.dispatch(tokenActions.fetchUser(props.match.params.token))
		props.dispatch(activitiesActions.fetchActivities(props.match.params.token))
	}, [])

	const activities = props.activities
	console.log(props)
	return (
		<div className="Board">
			{props.user && !props.user.admin ? (
				<Timeline pending>
					{activities
						? activities.map((activity, i) => (
								<ActivityContainer
									key={i}
									title={activity.name}
									date={activity.date}
									feedbacks={activity.feedbacks}
									voted={activity.voted}
									id={activity._id}
								/>
						  ))
						: ''}
				</Timeline>
			) : (
				<AdminBoardContainer user={props.user} activities={props.activities} />
			)}
		</div>
	)
}

export default Board
