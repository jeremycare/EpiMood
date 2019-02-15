import React from 'react'
import { Card, Timeline } from 'antd'
import DateFns from 'date-fns'

import Feedback from './FeedBack'
import DateTime from './DateTime'
import './Activity.css'

const Activity = props => {
	return (
		<Timeline.Item>
			<Card className="Activity" title={props.title} bodyStyle={{ padding: 0 }}>
				<div className="Activity-body">
					<div className="Date">
						<DateTime date={new Date(props.date)} />
					</div>
					<div className="Feedbacks-box">
						{props.feedbacks
							? props.feedbacks.map((feedback, i) => (
									<Feedback key={i} feedback={feedback} />
							  ))
							: ''}
					</div>
				</div>
			</Card>
		</Timeline.Item>
	)
}

export default Activity
