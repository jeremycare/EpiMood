import React from 'react'
import { Badge, Popover } from 'antd'
import { useHover } from 'react'

import { moods, cloud } from './images'
import './FeedBack.css'

const Feedback = props => {
	return props.feedback.comment ? (
		<Popover content={props.feedback.comment} trigger="hover">
			<div className="FeedBack">
				<img className="Emoji" src={moods[props.feedback.grade]} />
				<img src={cloud} />
			</div>
		</Popover>
	) : (
		<div className="FeedBack">
			<img src={moods[props.feedback.grade]} />
		</div>
	)
}

export default Feedback
