/*
    This file acts as a register for the variables used in the .env file
    Also allows the possibility to use fallback values
*/

require('dotenv').config();

module.exports = {
    DB_HOST: process.env.POSTGRES_HOST || "localhost",
    DB_NAME: process.env.POSTGRES_DB || "POSTGRES_DB not set",
    DB_USER: process.env.POSTGRES_USER || "POSTGRES_USER not set",
    DB_PASSWORD: process.env.POSTGRES_PASSWORD || "POSTGRES_PASSWORD not set",
    PORT: process.env.PORT || 8080,
    AUTH_SECRET: process.env.AUTH_SECRET || null,
    IS_LOCAL_ENV: process.env.IS_LOCAL_ENV || "true"
};
