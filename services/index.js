const { connectToMongoDB } = require("./mongo");
const { connectToMySQL } = require("./sequelize");
const { connectToS3 } = require("./s3");
const { connectToSNS } = require("./sns");

const initializeServices = async () => {
  console.log("Initializing services...");
  await connectToMongoDB();
  await connectToMySQL();
  await connectToS3();
  await connectToSNS();
};

module.exports = { initializeServices };
