const { db, Sequelize } = require('../config/database');
const Category = require('./category');

const Product = db.define('products', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  categoryId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Category,
      key: 'id'
    }
  }
}, {
  freezeTableName: true
});

module.exports = Product;