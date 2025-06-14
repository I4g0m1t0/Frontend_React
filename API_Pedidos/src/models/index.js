// src/models/index.js
const User         = require('./user');
const Category     = require('./category');
const Product      = require('./product');
const Order        = require('./order');
const OrderProduct = require('./orderProduct');

// Usuário 1:N Pedidos
User.hasMany(Order,     { foreignKey: 'userId',   as: 'orders' });
Order.belongsTo(User,   { foreignKey: 'userId',   as: 'user'   });

// Categoria 1:N Produto
Category.hasMany(Product,    { foreignKey: 'categoryId', as: 'products' });
Product.belongsTo(Category,  { foreignKey: 'categoryId', as: 'category' });

// Pedido N:N Produto
Order.belongsToMany(Product, {
  through: OrderProduct,
  foreignKey: 'orderId',
  otherKey:  'productId',
  as: 'products'
});
Product.belongsToMany(Order, {
  through: OrderProduct,
  foreignKey: 'productId',
  otherKey:  'orderId',
  as: 'orders'
});

module.exports = { User, Category, Product, Order, OrderProduct };
