module.exports = (sequelize, Sequelize) => {
    return sequelize.define("products", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        productName: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        price: {
            type: Sequelize.FLOAT,
            allowNull: false,
        }
    });
};
