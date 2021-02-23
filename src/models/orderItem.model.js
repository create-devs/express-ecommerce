const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const OrderItem = sequelize.define("orderItem", {
        title: {
            type: DataTypes.STRING
        },
        price: {
            type: DataTypes.DECIMAL
        },
        quantity: {
            type: DataTypes.INTEGER
        }
    });

    return OrderItem;
};  