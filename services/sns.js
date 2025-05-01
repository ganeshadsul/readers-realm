const AWS = require("aws-sdk");
const config = require("../config/default");

const sns = config.aws.sns.topicArn
	? new AWS.SNS({
		accessKeyId: config.aws.sns.accessKeyId,
		secretAccessKey: config.aws.sns.secretAccessKey,
		region: config.aws.sns.region,
	})
	: null;

const connectToSNS = () => {
	if (!sns) {
		console.log('\x1b[33m%s\x1b[0m', "SNS config not provided. Skipping SNS initialization.");
		return;
	}
	console.log('\x1b[32m%s\x1b[0m', "SNS initialized successfully.");
};

module.exports = { sns, connectToSNS };
