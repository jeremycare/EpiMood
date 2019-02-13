import React from 'react'
import DateFns from 'date-fns'

import './DateTime.css'

const DateTime = props => {
	const date = props.date
	const diffDate = DateFns.differenceInDays(new Date(), date)
	return (
		<div className="DateTime">
			<div className="Title">
				{diffDate > 0 ? diffDate + ' DAYS AGO' : 'TODAY'}
			</div>
			<div className="DateBody">
				<div className="Text-Day">{DateFns.format(date, 'ddd')}</div>
				<div className="Text-Number">{DateFns.format(date, 'D')}</div>
				<div className="Text-Month">{DateFns.format(date, 'MMMM')}</div>
			</div>
			<div className="Time">{DateFns.format(date, 'HH:mm')}</div>
		</div>
	)
}

export default DateTime
