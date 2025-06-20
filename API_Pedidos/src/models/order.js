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
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'ativo'   // valores típicos: 'ativo', 'cancelado', 'pago', 'enviado'
  }
}, {
  freezeTableName: true,
  timestamps: true
});


module.exports = Order;
