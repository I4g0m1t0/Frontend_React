const { db, Sequelize } = require('../config/database');

const Order = db.define('orders', {
  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: false,
    references: { model: 'users', key: 'id' }
  },
  status: {
    type: Sequelize.ENUM('ativo', 'cancelado', 'pago', 'enviado', 'em_preparo', 'pronto', 'entregue'),
    allowNull: false,
    defaultValue: 'ativo'
  }
}, {
  freezeTableName: true,
  timestamps: true
});

module.exports = Order;
