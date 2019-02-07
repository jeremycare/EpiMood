import React, { Component } from 'react'
import { connect } from 'react-redux'
import NavBarContainer from './NavBar/NavBarContainer'
import Board from './Board/Board'
import './App.css'

class App extends Component {
	render() {
		return (
			<div className="App">
				<header className="App-header" />
				<div className="App-body">
					<NavBarContainer />
					<Board />
				</div>
			</div>
		)
	}
}

export default connect()(App)
