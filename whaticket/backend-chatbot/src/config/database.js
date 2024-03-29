"use strict";
require("../bootstrap");
module.exports = {
    dialect: process.env.DB_DIALECT || "mysql",
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS
};
