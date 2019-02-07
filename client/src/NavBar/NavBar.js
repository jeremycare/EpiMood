import React, { useState } from 'react'
import { Menu, Icon } from 'antd'
import { tokenActions } from '../actions'

const Navbar = props => {
	const [current, setCurrent] = useState('mail')

	const menuHandleClick = e => {
		setCurrent(e.key)
		switch (e.key) {
			case 'mail':
				props.dispatch(tokenActions.updateToken('test'))
				break
			default:
				return
		}
	}

	return (
		<div className="Navbar">
			<Menu
				onClick={menuHandleClick}
				selectedKeys={[current]}
				mode="horizontal"
			>
				<Menu.Item key="mail">
					<Icon type="mail" />
					New Login Link
				</Menu.Item>
				<Menu.Item key="app">
					<Icon type="retweet" />
					Refresh
				</Menu.Item>
			</Menu>
		</div>
	)
}

export default Navbar
