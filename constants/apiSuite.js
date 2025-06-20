const appConstants = require('../constants/appConstants')
const API_SUITE = {
	"GET /api/v1/health": {
		description: "Check API health status",
		apiType: "GET",  // API type: GET, POST, etc.
		payload: {},
		clientCodeRequired: true,
		clientCode: appConstants.CLIENT_CODES[0], // Specific client code for this endpoint
	},
	'POST /api/v1/auth/login' : {
		description: "logging in user into the application",
		apiType: "POST",  // API type: GET, POST, etc.
		payload: {
			query: {
				required: [],
			},
			body: {
				required: [
					'email', 'password'
				]
			}
		},
		clientCodeRequired: true,
		clientCode: appConstants.CLIENT_CODES[0], // Specific client code for this endpoint
	},
	"GET /api/v1/roles": {
		description: "Get list of user roles",
		apiType: "GET",
		payload: {
			query: {
				required: [],
				optional: []
			},
		},
		clientCodeRequired: true,
		clientCode: appConstants.CLIENT_CODES[0], // Specific client code for this endpoint
	},
};
module.exports = API_SUITE;
