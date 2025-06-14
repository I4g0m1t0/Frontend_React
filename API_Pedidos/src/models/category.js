const { db, Sequelize } = require('../config/database');

const Category = db.define('categories', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  freezeTableName: true
});

module.exports = Category;
