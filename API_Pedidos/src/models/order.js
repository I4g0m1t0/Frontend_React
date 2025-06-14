// models/order.js
const { db, Sequelize } = require('../config/database');
const User    = require('./user');
const Product = require('./product');

const Order = db.define('orders', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: { model: User, key: 'id' }
  }
}, {
  freezeTableName: true
});

module.exports = Order;
