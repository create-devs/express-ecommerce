const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Product = sequelize.define("product", {
        title: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.TEXT
        },
        image: {
            type: DataTypes.STRING,
            get() {
                return this.getDataValue('image').split('|')
            },
            set(val) {
               this.setDataValue('image',val.join('|'));
            },
        },
        price: {
            type: DataTypes.INTEGER
        },
        sale_price: {
            type: DataTypes.INTEGER
        },
        category: {
            type: DataTypes.STRING
        },
        manage_stock: {
            type: DataTypes.BOOLEAN
        },
        stock: {
            type: DataTypes.INTEGER
        }
    });

    return Product;
};  