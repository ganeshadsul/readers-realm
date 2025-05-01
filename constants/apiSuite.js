const appConstants = require('../constants/appConstants')
const API_SUITE = {
	"/api/v1/health": {
		description: "Check API health status",
		apiType: "GET",  // API type: GET, POST, etc.
		parameters: [],
		clientCodeRequired: true,
		clientCode: appConstants.CLIENT_CODES[0], // Specific client code for this endpoint
	},
};
module.exports = API_SUITE;
