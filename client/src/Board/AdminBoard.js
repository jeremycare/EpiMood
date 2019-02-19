import React from 'react'
import { useState } from 'react'
import {
	Table,
	List,
	Button,
	Modal,
	Input,
	DatePicker,
	TimePicker,
	Icon,
	Menu,
} from 'antd'
import moment from 'moment'
import Papa from 'papaparse'

import { tokenActions, activitiesActions } from '../actions'
import NavBarContainer from '../NavBar/NavBarContainer'
import ActivityContainer from './ActivityContainer'
import { moods } from './images'

import './AdminBoard.css'

const AdminBoard = props => {
	const [editing, setEditing] = useState(false)
	const [adding, setAdding] = useState(false)
	const [activity, setActivity] = useState({})
	const [users, setUsers] = useState([])

	const titleImage = index => {
		return (
			<div className="TitleImage">
				<img alt="" src={moods[index]} />
			</div>
		)
	}

	const buildTitle = x => {
		return <div className="TitleColumn">{x}</div>
	}

	const showEdit = e => {
		setActivity(props.activities[e])
		setEditing(true)
	}

	const handleClose = e => {
		setActivity({})
		setEditing(false)
	}

	const handleSubmitEdit = () => {
		props.dispatch(
			activitiesActions.updateActivity(
				{
					name: activity.name,
					date: activity.date,
					users: users,
				},
				activity._id,
				props.token
			)
		)
		setEditing(false)
		setActivity({})
		setUsers([])
	}

	const handleSubmitAdd = () => {
		props.dispatch(
			activitiesActions.addActivity(
				{
					name: activity.name,
					date: activity.date,
					users: users,
				},
				props.token
			)
		)
		setAdding(false)
		setActivity({})
		setUsers([])
	}

	const handleChangeName = e => {
		setActivity({ ...activity, name: e.target.value })
	}

	const handleChangeDate = e => {
		const dateM = moment(activity.date)
		dateM &&
			dateM.set({
				month: e.get('month'),
				year: e.get('year'),
				day: e.get('day'),
			})
		setActivity({ ...activity, date: dateM })
	}

	const handleChangeTime = e => {
		const dateM = moment(activity.date)
		dateM.set({ hour: e.get('hour'), minute: e.get('minute') })
		setActivity({ ...activity, date: dateM })
	}

	const handleChangeFile = e => {
		Papa.parse(e.target.files[0], {
			complete: results => {
				results.data.shift()
				setUsers(results.data.map(x => x[0]).filter(x => x !== ''))
			},
		})
	}

	const handleAddActivity = e => {
		setAdding(true)
	}

	const countMood = (index, array) => {
		return array.reduce((prev, x) => (x.grade === index ? prev + 1 : prev), 0)
	}

	const activities = props.activities
		? props.activities.map((x, i) => {
				return {
					name: x.name,
					date: moment(x.date).format('DD-MMM-YYYY HH:mm:SS'),
					users: x.users.map(user => (user.user ? user.user.email : '')),
					comments: x.feedbacks
						.map(feedback => feedback.comment)
						.filter(feedback => feedback !== undefined),
					coldsweat: countMood(0, x.feedbacks),
					confused: countMood(1, x.feedbacks),
					expressionLess: countMood(2, x.feedbacks),
					smiling: countMood(3, x.feedbacks),
					heartEyes: countMood(4, x.feedbacks),
					key: i,
				}
		  })
		: []
	const columns = [
		{
			title: 'Action',
			dataIndex: '',
			key: 'x',
			render: row => <Button onClick={() => showEdit(row.key)}>Edit</Button>,
		},
		{
			title: buildTitle('Name'),
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: buildTitle('Date'),
			dataIndex: 'date',
			key: 'date',
		},
		{
			title: buildTitle('Users'),
			dataIndex: 'users',
			key: 'users',
			render: users => {
				return (
					<List
						bordered
						dataSource={users}
						renderItem={item => <List.Item>{item}</List.Item>}
					/>
				)
			},
		},
		{
			title: buildTitle('Comments'),
			dataIndex: 'comments',
			key: 'comments',
			render: users => {
				return (
					<List
						bordered
						dataSource={users}
						renderItem={item => <List.Item>{item}</List.Item>}
					/>
				)
			},
		},
		{
			title: titleImage(0),
			dataIndex: 'coldsweat',
			key: 'coldsweat',
		},
		{
			title: titleImage(1),
			dataIndex: 'confused',
			key: 'confused',
		},
		{
			title: titleImage(2),
			dataIndex: 'expressionLess',
			key: 'expressionLess',
		},
		{
			title: titleImage(3),
			dataIndex: 'smiling',
			key: 'smiling',
		},
		{
			title: titleImage(4),
			dataIndex: 'heartEyes',
			key: 'heartEyes',
			className: 'Number',
		},
	]
	return (
		<div className="AdminBoard">
			<Menu onClick={handleAddActivity} mode="horizontal">
				<Menu.Item key="app">
					<Icon type="plus-circle" />
					Add Activity
				</Menu.Item>
			</Menu>
			<Modal
				title="Edit Activity"
				visible={adding}
				onOk={handleSubmitAdd}
				onCancel={handleClose}
			>
				<Input
					placeholder="Activity Name"
					value={activity.name}
					onChange={handleChangeName}
				/>
				<DatePicker
					defaultValue={moment(activity.date)}
					onChange={handleChangeDate}
				/>
				<TimePicker
					defaultValue={moment(activity.date)}
					onChange={handleChangeTime}
				/>
				<input
					type="file"
					id="file"
					className="input-file"
					accept=".csv"
					onChange={handleChangeFile}
				/>
				<div>{users ? users.length + ' users !' : ''}</div>
			</Modal>
			<Modal
				title="Edit Activity"
				visible={editing}
				onOk={handleSubmitEdit}
				onCancel={handleClose}
			>
				<Input
					placeholder="Activity Name"
					value={activity.name}
					onChange={handleChangeName}
				/>
				<DatePicker
					defaultValue={moment(activity.date)}
					onChange={handleChangeDate}
				/>
				<TimePicker
					defaultValue={moment(activity.date)}
					onChange={handleChangeTime}
				/>
				<input
					type="file"
					id="file"
					className="input-file"
					accept=".csv"
					onChange={handleChangeFile}
				/>
				<div>{users ? users.length + ' users !' : ''}</div>
			</Modal>
			<Table dataSource={activities} columns={columns} />
		</div>
	)
}

export default AdminBoard
