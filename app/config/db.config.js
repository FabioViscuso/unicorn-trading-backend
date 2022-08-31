/*
    This file contains the specifics for connecting to
    a given database instance. Variable values are
    taken from env.config.js
*/

const env = require("./env.config");

module.exports = {
    HOST: env.DB_HOST,
    USER: env.DB_USER,
    PASSWORD: env.DB_PASSWORD,
    DB: env.DB_NAME,
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
