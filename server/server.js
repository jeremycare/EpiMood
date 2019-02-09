const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const CronJob = require('cron').CronJob
const cors = require('cors')

const app = express()

const apiRoutes = require('./routes/index')

app.use(
	bodyParser.urlencoded({
		extended: true,
	})
)
app.use(bodyParser.json())

mongoose.connect('mongodb://localhost/epimood')

const db = mongoose.connection
const port = process.env.PORT || 8080

app.use(cors())

app.get('/', (req, res) => res.send('Hello World with Express'))

app.use('/api', apiRoutes)

app.listen(port, function() {
	console.log('Running Epimood on port ' + port)
})

const UserController = require('./controllers/userController')
new CronJob(
	'0 0 18 * * *',
	() => {
		UserController.sendReminders()
	},
	null,
	true,
	'Europe/Paris'
)
