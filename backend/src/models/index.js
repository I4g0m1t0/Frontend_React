const { db } = require('../config/database');
const User = require('./user');
const Category = require('./category');
const Product = require('./product');
const Order = require('./order');
const OrderProduct = require('./orderProduct');

// Associações

// User 1:N Order
User.hasMany(Order, { foreignKey: 'userId', as: 'orders', onDelete: 'CASCADE' });
Order.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Category 1:N Product
Category.hasMany(Product, { foreignKey: 'categoryId', as: 'products', onDelete: 'SET NULL' });
Product.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });

// Order N:N Product via OrderProduct
Order.belongsToMany(Product, {
  through: OrderProduct,
  foreignKey: 'orderId',
  otherKey: 'productId',
  as: 'products'
});

Product.belongsToMany(Order, {
  through: OrderProduct,
  foreignKey: 'productId',
  otherKey: 'orderId',
  as: 'orders'
});

module.exports = { db, User, Category, Product, Order, OrderProduct };
