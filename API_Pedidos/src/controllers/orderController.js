// src/controllers/orderController.js
const { Order, Product, OrderProduct } = require('../models');

// Cria um pedido: recebe userId de req.user e lista de itens { productId, quantity }
exports.createOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { items } = req.body; // items: [{ productId, quantity }]

    // Cria o pedido
    const order = await Order.create({ userId });

    // Cria registros na tabela de junção
    const orderProducts = items.map(i => ({
      orderId: order.id,
      productId: i.productId,
      quantity: i.quantity || 1
    }));
    await OrderProduct.bulkCreate(orderProducts);

    // Retorna pedido com itens
    const newOrder = await Order.findByPk(order.id, {
      include: [{
        model: Product,
        as: 'products',
        through: { attributes: ['quantity'] }
      }]
    });
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar pedido', error: err.message });
  }
};

// Lista todos os pedidos do usuário autenticado
exports.getByUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.findAll({
      where: { userId },
      include: [{
        model: Product,
        as: 'products',
        through: { attributes: ['quantity'] }
      }]
    });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar pedidos', error: err.message });
  }
};

// Busca um pedido por ID (somente do usuário)
exports.getById = async (req, res) => {
  try {
    const userId = req.user.id;
    const order = await Order.findOne({
      where: { id: req.params.id, userId },
      include: [{
        model: Product,
        as: 'products',
        through: { attributes: ['quantity'] }
      }]
    });
    if (!order) {
      return res.status(404).json({ message: 'Pedido não encontrado' });
    }
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar pedido', error: err.message });
  }
};

// Cancela um pedido: remove ou marca como cancelado
exports.cancelOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const order = await Order.findOne({ where: { id: req.params.id, userId } });
    if (!order) {
      return res.status(404).json({ message: 'Pedido não encontrado' });
    }
    // aqui removemos os itens e o pedido, ou marque como status
    await OrderProduct.destroy({ where: { orderId: order.id } });
    await order.destroy();
    res.json({ message: 'Pedido cancelado com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao cancelar pedido', error: err.message });
  }
};
