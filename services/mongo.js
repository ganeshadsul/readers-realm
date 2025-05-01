const mongoose = require("mongoose");
const config = require("../config/default");

const connectToMongoDB = async () => {
	if (!config.database.mongo.URI) {
		console.log('\x1b[33m%s\x1b[0m', "MongoDB URI not provided. Skipping MongoDB connection.");
		return;
	}

	try {
		await mongoose.connect(config.database.mongo.URI, {
			useNewUrlParser:true,
			useCreateIndex: true,
			useFindAndModify:false,
			useUnifiedTopology:true,
		});
		console.log("MongoDB connected successfully.");
	} catch (error) {
		console.error('\x1b[31m%s\x1b[0m', `Failed to connect to MongoDB: ${error.message}`);
	}
};

module.exports = { connectToMongoDB };
