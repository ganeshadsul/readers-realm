const errorMessages = require('../constants/errorMessages')

const notFoundHandler = (req, res, next) => {
	res.status(404).json({
		message: errorMessages.NOT_FOUND
	})
}

const errorHandler = (err, req, res, next) => {
	console.log(`Error: ${err.message}`)
	res.status(err.statusCode || 500).json({
		status : err.status || undefined,
		message: err.message || errorMessages.INTERNAL_SERVER_ERROR,
		stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
	})
}

module.exports = { notFoundHandler, errorHandler }