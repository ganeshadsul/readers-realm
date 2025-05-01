require("dotenv").config(); // Load environment variables from .env

module.exports = {
	app: {
		port: process.env.PORT || 3000,
	},
	database: {
		mongo: {
			URI: process.env.MONGO_URI || undefined,
		},
		mysql: {
			host: process.env.MYSQL_HOST || undefined,
			username: process.env.MYSQL_USER || undefined,
			password: process.env.MYSQL_PASSWORD || undefined,
			database: process.env.MYSQL_DB || undefined,
		},
	},
	aws: {
		s3: {
			bucketName: process.env.S3_BUCKET || undefined,
			region: process.env.S3_REGION || undefined,
		},
		sns: {
			topicArn: process.env.SNS_TOPIC_ARN || undefined,
			region: process.env.SNS_REGION || undefined,
		},
	},
};
