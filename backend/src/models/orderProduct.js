const { db, Sequelize } = require('../config/database');

// Tabela intermediária entre Pedidos e Produtos
const OrderProduct = db.define('order_products', {
  orderId: {
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: false,
    primaryKey: true,
    references: { model: 'orders', key: 'id' },
    field: 'orderId'
  },
  productId: {
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: false,
    primaryKey: true,
    references: { model: 'products', key: 'id' },
    field: 'productId'
  },
  quantity: {
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: false,
    defaultValue: 1
  },
  observation: {
    type: Sequelize.TEXT,
    allowNull: true
  }
}, {
  tableName: 'order_products',
  freezeTableName: true,
  timestamps: true
});

module.exports = OrderProduct;
