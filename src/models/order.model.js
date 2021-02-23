const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Order = sequelize.define("order", {
        status: {
            type: DataTypes.STRING
        },
        name: {
            type: DataTypes.STRING
        },
        phone: {
            type: DataTypes.STRING
        },
        address: {
            type: DataTypes.TEXT
        },
        subtotal: {
            type: DataTypes.DECIMAL
        },
        shipping_fee: {
            type: DataTypes.DECIMAL
        },
        total: {
            type: DataTypes.DECIMAL
        },
        payment_method: {
            type: DataTypes.STRING
        },
        payment_status: {
            type: DataTypes.BOOLEAN
        },
        shipping_method: {
            type: DataTypes.STRING
        }
    });

    return Order;
};