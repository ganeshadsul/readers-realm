const API_SUITE = require('../constants/apiSuite')
const errorMessages = require('../constants/errorMessages')

const validateRequest = (req, res, next) => {
	const { method, path } = req
	const clientCode = req.headers['client_code']
	const endPoint = API_SUITE[path]

	// Checking if API exists in the suite
	if(!endPoint) {
		return res.status(404).json({ message: errorMessages.API_ENDPOINT_NOT_FOUND })
	}

	// Checking if API method is correct
	if(endPoint.apiType !== method) {
		return res.status(405).json({
			message: errorMessages.INVALID_REQUEST_TYPE(endPoint.apiType)
		})
	}

	// Checking is client_code is valid
	if(endPoint.clientCodeRequired && clientCode !== endPoint.clientCode) {
		return res.status(403).json({
			message: errorMessages.INVALID_CLIENT_CODE
		})
	}

	// Validating request parameters
	next()
}

module.exports = validateRequest