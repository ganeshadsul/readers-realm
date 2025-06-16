const API_SUITE = require('../constants/apiSuite')
const errorMessages = require('../constants/errorMessages')
const AppError = require('../utils/AppError')

const validateRequest = (req, res, next) => {
	const { method, path } = req
	const clientCode = req.headers['client_code']
	const endPoint = API_SUITE[path]

	// Checking if API exists in the suite
	if(!endPoint) {
		next(new AppError(404, errorMessages.API_ENDPOINT_NOT_FOUND))
	}

	// Checking if API method is correct
	if(endPoint.apiType !== method) {
		next(new AppError(405, errorMessages.INVALID_REQUEST_TYPE(endPoint.apiType)))
	}

	// Checking is client_code is valid
	if(endPoint.clientCodeRequired && clientCode !== endPoint.clientCode) {
		next(new AppError(403, errorMessages.INVALID_CLIENT_CODE))
	}

	const payload = endPoint.payload || {}
	// Validating request parameters and body
	const requriedQueries = payload?.query?.required || []
	const requriedBody = payload?.body?.required || []
	const missingQueries = requriedQueries.filter((param) => !req.query.hasOwnProperty(param))
	const missingbody = requriedBody.filter((param) => !req.body.hasOwnProperty(param))

	if(missingQueries.length || missingbody.length) {
		res.status(500).json({
			status: 'fail',
			message: errorMessages.INVALID_REQUEST_PAYLOAD
		})
	}
	next()
}

module.exports = validateRequest