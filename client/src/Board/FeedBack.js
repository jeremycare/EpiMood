import React from 'react'
import { Popover } from 'antd'

import { moods, cloud } from './images'
import './FeedBack.css'

const Feedback = props => {
	return props.feedback.comment ? (
		<Popover content={props.feedback.comment} trigger="hover">
			<div className="FeedBack">
				<img alt="" className="Emoji" src={moods[props.feedback.grade]} />
				<img alt="" src={cloud} />
			</div>
		</Popover>
	) : (
		<div className="FeedBack">
			<img alt="" src={moods[props.feedback.grade]} />
		</div>
	)
}

export default Feedback
