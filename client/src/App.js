import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Router, Route } from 'react-router'
import createBrowserHistory from 'history/createBrowserHistory'

import Home from './Home/Home'
import BoardContainer from './Board/BoardContainer'
import './App.css'

class App extends Component {
	render() {
		const history = createBrowserHistory()
		return (
			<Router history={history}>
				<div className="App">
					<header className="App-header">
						<div className="App-body">
							<Route exact path="/" component={Home} />
							<Route exact path="/:token" component={BoardContainer} />
						</div>
					</header>
				</div>
			</Router>
		)
	}
}

const mapDispatchToProps = dispatch => {
	return {
		dispatch: dispatch,
	}
}

export default connect(mapDispatchToProps)(App)
