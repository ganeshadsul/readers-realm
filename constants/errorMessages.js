const ERROR_MESSAGES = {
	NOT_FOUND: "The requested resource was not found.",
	INTERNAL_SERVER_ERROR: "Internal Server Error.",
	INVALID_CLIENT_CODE: "Invalid client code.",
	API_ENDPOINT_NOT_FOUND: "API endpoint not found in suite.",
	INVALID_REQUEST_TYPE: (method) => `Invalid request type. Use ${method}.`,
};

module.exports = ERROR_MESSAGES;
	