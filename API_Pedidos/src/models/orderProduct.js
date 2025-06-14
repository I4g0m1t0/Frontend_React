// models/orderProducts.js
const { db, Sequelize } = require('../config/database');

const OrderProducts = db.define('order_products', {
  orderId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    references: { model: 'orders',   key: 'id' }
  },
  productId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    references: { model: 'products', key: 'id' }
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1
  }
}, {
  freezeTableName: true
});

module.exports = OrderProducts;
