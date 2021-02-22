const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const User = sequelize.define("user", {
        name: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        phone: {
            type: DataTypes.STRING
        },
        address: {
            type: DataTypes.TEXT
        },
        password: {
            type: DataTypes.STRING
        },
        role: {
            type: DataTypes.INTEGER
        }
    });

    return User;
};  