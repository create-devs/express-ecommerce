const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Category = sequelize.define("category", {
        name: {
            type: DataTypes.STRING
        },
        slug: {
            type: DataTypes.STRING
        },
        parentId: {
            type: DataTypes.INTEGER
        },
    });

    return Category;
};