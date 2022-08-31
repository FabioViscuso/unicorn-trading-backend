module.exports = (sequelize, Sequelize) => {
    return sequelize.define("wishlist", {
        orderID: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        products: {
            type: Sequelize.STRING
        }
    });
};
