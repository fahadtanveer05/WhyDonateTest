const Sequelize = require("sequelize");
const err = require("../Misc/constants");
const env = require("dotenv");
env.config();

const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_DATABASE = process.env.DB_DATABASE;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;

const sequelize = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
  dialect: "mysql",
  host: DB_HOST,
});

connect = (req, res, next) => {
  sequelize
    .authenticate()
    .then(() => {
      return res.status(err.sucess).send({
        data: "Connection has been established successfully",
      });
    })
    .catch((err) => {
      return res.status(err.not_found).json({
        Error: {
          code: err.not_found,
          Message: "Unable to connect to the database",
        },
      });
    });
};

module.exports = { sequelize, connect };
