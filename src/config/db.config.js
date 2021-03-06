const config = {
    HOST: process.env.HOST || 'localhost',
    USER: process.env.USER || 'root',
    PASSWORD: process.env.PASSWORD || '',
    DB: process.env.DB || 'nodecom',
    dialect: process.env.DIALECT || 'mysql',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
}
const Sequelize = require("sequelize");
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  operatorsAliases: 0,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle
  }
});

const db = {};

db.sequelize = sequelize;

// Init Tables
db.categories = require("../models/category.model.js")(sequelize);
db.products = require("../models/product.model.js")(sequelize);
db.reviews = require("../models/review.model.js")(sequelize);
db.users = require("../models/user.model.js")(sequelize);
db.orders = require("../models/order.model.js")(sequelize);
db.order_items = require("../models/orderItem.model.js")(sequelize);

// Relations
db.products.hasMany(db.reviews, {as: "reviews", onDelete: 'CASCADE'});
db.reviews.belongsTo(db.products, {
  foreignKey: "productId",
  as: "product"
})

db.users.hasMany(db.orders, {as: "orders"});
db.orders.belongsTo(db.users, {
  foreignKey: "userId",
  as: "user"
})

// OrderItems for Order
db.orders.hasMany(db.order_items, {as: "order_items"});
db.order_items.belongsTo(db.orders, {
  foreignKey: "orderId",
  as: "order",
})
db.order_items.belongsTo(db.products, {
  foreignKey: "productId",
  as: "product"
})

// Product Categories
db.products.belongsToMany(db.categories, {
  through: "product_cat",
  as: "categories",
  foreignKey: "productId",
  onDelete: 'CASCADE'
})
db.categories.belongsToMany(db.products, {
  through: "product_cat",
  as: "products",
  foreignKey: "catId",
  onDelete: 'CASCADE'
})

// Nested Categories
db.categories.hasMany(db.categories, {as: "categories"});
db.categories.belongsTo(db.categories, {
  foreignKey: "categoryId",
  as: "category"
})


module.exports = db;
