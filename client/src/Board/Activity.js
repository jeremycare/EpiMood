import React from 'react'
import { useState } from 'react'
import { Card, Timeline, Modal, Button, Input } from 'antd'

import { sendFeedback } from '../actions/activityActions'
import Feedback from './FeedBack'
import DateTime from './DateTime'
import './Activity.css'
import { add, moods } from './images'

const Activity = props => {
	const [visible, setVisible] = useState(false)
	const [loading, setLoading] = useState(false)
	const [grade, setGrade] = useState(-1)
	const [comment, setComment] = useState('')
	const [gradeError, setGradeError] = useState(false)

	const handleCancel = () => {
		setVisible(false)
	}

	const handleOk = () => {
		if (grade !== -1) {
			setLoading(true)
			props.dispatch(
				sendFeedback(props.id, { grade: grade, comment: comment }, props.token)
			)
		} else {
			setGradeError(true)
		}
	}

	const showModal = () => {
		setVisible(true)
	}

	const updateComment = e => {
		setComment(e.target.value)
	}

	const setGradeColdsweat = () => {
		setGrade(0)
	}

	const setGradeConfused = () => {
		setGrade(1)
	}

	const setGradeExpressionLess = () => {
		setGrade(2)
	}

	const setGradeSmiling = () => {
		setGrade(3)
	}

	const setGradeHeartEyes = () => {
		setGrade(4)
	}

	return (
		<Timeline.Item>
			<Card className="Activity" title={props.title} bodyStyle={{ padding: 0 }}>
				<div className="Activity-body">
					<div className="Date">
						<DateTime date={new Date(props.date)} />
					</div>
					<div className="Feedbacks-box">
						{props.voted ? (
							''
						) : (
							<div>
								<div className="Emoji" onClick={showModal}>
									<img alt="" src={add} />
								</div>
								<Modal
									visible={visible}
									title="Add Feedback"
									onOk={handleOk}
									onCancel={handleCancel}
									footer={[
										<Button key="back" onClick={handleCancel}>
											Return
										</Button>,
										<Button
											key="submit"
											type="primary"
											loading={loading}
											onClick={handleOk}
										>
											Submit
										</Button>,
									]}
								>
									<div
										className="RadioGroupBox"
										style={gradeError ? { border: '2px solid red' } : {}}
									>
										<img
											alt=""
											className={'FormIcon' + (grade === 0 ? ' selected' : '')}
											src={moods[0]}
											onClick={setGradeColdsweat}
										/>
										<img
											alt=""
											className={'FormIcon' + (grade === 1 ? ' selected' : '')}
											src={moods[1]}
											onClick={setGradeConfused}
										/>
										<img
											alt=""
											className={'FormIcon' + (grade === 2 ? ' selected' : '')}
											src={moods[2]}
											onClick={setGradeExpressionLess}
										/>
										<img
											alt=""
											className={'FormIcon' + (grade === 3 ? ' selected' : '')}
											src={moods[3]}
											onClick={setGradeSmiling}
										/>
										<img
											alt=""
											className={'FormIcon' + (grade === 4 ? ' selected' : '')}
											src={moods[4]}
											onClick={setGradeHeartEyes}
										/>
									</div>
									<Input
										placeholder="Optionnal comment."
										value={comment}
										onChange={updateComment}
									/>
								</Modal>
							</div>
						)}
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
