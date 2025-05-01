const AWS = require("aws-sdk");
require("aws-sdk/lib/maintenance_mode_message").suppress = true;
const config = require("../config/default");

const s3 = config.aws.s3.bucket
	? new AWS.S3({
		accessKeyId: config.aws.s3.accessKeyId,
		secretAccessKey: config.aws.s3.secretAccessKey,
		region: config.aws.s3.region,
	})
	: null;

const connectToS3 = () => {
	if (!s3) {
		console.log('\x1b[33m%s\x1b[0m', "S3 config not provided. Skipping S3 initialization.");
		return;
	}
	console.log(`\x1b[32m%s\x1b[0m`, "S3 initialized successfully.");
};

module.exports = { s3, connectToS3 };
