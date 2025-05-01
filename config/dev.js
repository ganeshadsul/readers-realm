require("dotenv").config(); // Load environment variables from .env

module.exports = {
	app: {
		port: process.env.PORT || 3000,
	},
	database: {
		mongoURI: process.env.MONGO_URI,
		mysql: {
			host: process.env.MYSQL_HOST,
			username: process.env.MYSQL_USER,
			password: process.env.MYSQL_PASSWORD,
			database: process.env.MYSQL_DB,
		},
	},
	aws: {
		s3: {
			bucketName: process.env.S3_BUCKET,
			region: process.env.S3_REGION,
		},
		sns: {
			topicArn: process.env.SNS_TOPIC_ARN,
			region: process.env.SNS_REGION,
		},
	},
};
