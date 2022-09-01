/*
    In this file we make a new Sequelize instance, creating a connection
    using the variables stored in db.config.js
    We also create an exported db object with the imported models and
    the relationships between them
*/

const config = require("../config/db.config.js");
const env = require("../config/env.config")


const Sequelize = require("sequelize");

let sequelize;

function dbModeSelect() {
    if (env.IS_LOCAL_ENV === 'true') {
        sequelize = new Sequelize(
            config.DB,
            config.USER,
            config.PASSWORD,
            {
                host: config.HOST,
                dialect: config.dialect,
                operatorsAliases: false,
                pool: {
                    max: config.pool.max,
                    min: config.pool.min,
                    acquire: config.pool.acquire,
                    idle: config.pool.idle
                }
            }
        );
    } else {
        sequelize = new Sequelize(
            config.DB,
            config.USER,
            config.PASSWORD,
            {
                host: config.HOST,
                dialect: config.dialect,
                operatorsAliases: false,
                dialectOptions: {
                    ssl: {
                        require: true,
                        rejectUnauthorized: false
                    }
                },
                pool: {
                    max: config.pool.max,
                    min: config.pool.min,
                    acquire: config.pool.acquire,
                    idle: config.pool.idle
                }
            }
        );
    }
}
dbModeSelect()

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
});
db.user.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
});

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
