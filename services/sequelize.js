const { Sequelize } = require("sequelize");
const config = require("../config/default");

const sequelize = new Sequelize(
	config.database.mysql.database,
	config.database.mysql.username,
	config.database.mysql.password,
	{
		host: config.database.mysql.host,
		dialect: "mysql",
	}
);

const connectToMySQL = async () => {
	if (!config.database.mysql.host) {
		console.log('\x1b[33m%s\x1b[0m', "MySQL config not provided. Skipping MySQL connection.");
		return;
	}

	try {
		await sequelize.authenticate();
		console.log('\x1b[32m%s\x1b[0m', "MySQL connected successfully.");
	} catch (error) {
		console.error('\x1b[31m%s\x1b[0m', "Failed to connect to MySQL:", error.message);
	}
};

module.exports = { sequelize, connectToMySQL };
