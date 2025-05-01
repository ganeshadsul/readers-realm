const express = require('express')
const { initializeServices } = require('./services')
const { notFoundHandler, errorHandler } = require('./middlewares')
const morgan = require('morgan')
const routes = require('./routes')
require('dotenv').config()

const app = express()
app.use(express.json())

if(process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'))
}

app.use(routes)

app.use(notFoundHandler)
app.use(errorHandler)

const PORT = process.env.PORT || 3000
const startServer = async() => {
	await initializeServices()
	app.listen(PORT, () => {
		console.log(`\x1b[32m%s\x1b[0m`, `Server running on http://localhost:${PORT}`)
	})
}
startServer()