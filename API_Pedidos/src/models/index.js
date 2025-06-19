const User = require('./User');
const Category = require('./Category');
const Product = require('./Product');
const Order = require('./Order');
const OrderProduct = require('./OrderProduct');

// Definição das associações
// Um usuário pode ter muitos pedidos
User.hasMany(Order, { foreignKey: 'userId', as: 'orders' });
Order.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Uma categoria pode ter muitos produtos
Category.hasMany(Product, { foreignKey: 'categoryId', as: 'products' });
Product.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });

// Relação muitos-para-muitos entre Order e Product através de OrderProduct
// Esta é para quando você quer acessar os produtos diretamente de um pedido, e vice-versa
Order.belongsToMany(Product, { through: OrderProduct, foreignKey: 'pedidos_idpedido', as: 'products' });
Product.belongsToMany(Order, { through: OrderProduct, foreignKey: 'produtos_idproduto', as: 'orders' });

Order.hasMany(OrderProduct, { foreignKey: 'pedidos_idpedido', as: 'orderProducts' });

// Associações diretas para a tabela intermediária OrderProduct
OrderProduct.belongsTo(Order, { foreignKey: 'pedidos_idpedido', as: 'order' });
OrderProduct.belongsTo(Product, { foreignKey: 'produtos_idproduto', as: 'product' });

module.exports = {
    User,
    Category,
    Product,
    Order,
    OrderProduct,
};
