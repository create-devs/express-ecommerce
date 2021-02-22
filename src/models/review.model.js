const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Review = sequelize.define("review", {
        rating: {
            type: DataTypes.INTEGER
        },
        name: {
            type: DataTypes.STRING
        },
        review: {
            type: DataTypes.TEXT
        }
    });

    return Review;
};  