// src/controllers/orderController.js
const { Order, Product, OrderProduct } = require('../models');

exports.createOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { items } = req.body; // [{ productId, quantity }]

    // 1) Validação básica
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Pedido vazio. Informe ao menos um item.' });
    }

    // 2) Verifica existência de todos os produtos
    const productIds = items.map(i => i.productId);
    const products = await Product.findAll({ where: { id: productIds } });
    if (products.length !== productIds.length) {
      return res.status(400).json({ message: 'Um ou mais produtos não foram encontrados.' });
    }

    // 3) Cria o pedido
    const order = await Order.create({ userId });

    // 4) Associa cada produto, um a um, com a quantidade
    for (const item of items) {
      // encontra a instância do Product
      const productInstance = products.find(p => p.id === item.productId);
      // associa com o through.quantity
      await order.addProduct(productInstance, { through: { quantity: item.quantity || 1 } });
    }

    // 5) Recarrega o pedido com os produtos e quantidades
    const newOrder = await Order.findByPk(order.id, {
      include: [{
        model: Product,
        as: 'products',
        through: { attributes: ['quantity'] }
      }]
    });

    return res.status(201).json(newOrder);

  } catch (err) {
    console.error('Erro ao criar pedido:', err);
    return res.status(500).json({ message: 'Erro ao criar pedido', error: err.message });
  }
};

// Os demais métodos (getByUser, getById, cancelOrder) permanecem iguais
exports.getByUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.findAll({
      where: { userId },
      attributes: ['id', 'userId', 'status', 'createdAt', 'updatedAt'], // explícito
      include: [
        {
          model: Product,
          as: 'products',
          through: { attributes: ['quantity'] }
        }
      ]
    });

    console.log("Pedidos retornados:", orders.map(o => ({ id: o.id, status: o.status }))); // debug no backend

    return res.json(orders);
  } catch (err) {
    console.error('Erro ao buscar pedidos:', err);
    return res.status(500).json({ message: 'Erro ao buscar pedidos', error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const userId = req.user.id;
    const order = await Order.findOne({
      where: { id: req.params.id, userId },
      include: [{ model: Product, as: 'products', through: { attributes: ['quantity'] } }]
    });
    if (!order) return res.status(404).json({ message: 'Pedido não encontrado.' });
    return res.json(order);
  } catch (err) {
    console.error('Erro ao buscar pedido:', err);
    return res.status(500).json({ message: 'Erro ao buscar pedido', error: err.message });
  }
};

exports.cancelOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const order = await Order.findOne({ where: { id: req.params.id, userId } });
    if (!order) return res.status(404).json({ message: 'Pedido não encontrado.' });

    // Marca como cancelado
    order.status = 'cancelado';
    await order.save();

    return res.json({ message: 'Pedido cancelado com sucesso.' });
  } catch (err) {
    console.error('Erro ao cancelar pedido:', err);
    return res.status(500).json({ message: 'Erro ao cancelar pedido', error: err.message });
  }
};

// Atualiza somente o status
exports.updateStatus = async (req, res) => {
  try {
    const userId = req.user.id;
    let { status } = req.body;

    // Mapeia valores numéricos para status válidos
    const statusMap = {
      "1": "em_preparo",
      "2": "pronto",
      "3": "entregue"
    };

    // Se for valor numérico, converte
    if (statusMap[status]) {
      status = statusMap[status];
    }

    const validStatuses = ['ativo', 'em_preparo', 'pronto', 'entregue', 'cancelado'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Status inválido.' });
    }

    const order = await Order.findOne({ where: { id: req.params.id, userId } });
    if (!order) return res.status(404).json({ message: 'Pedido não encontrado.' });

    order.status = status;
    await order.save();

    return res.json(order);
  } catch (err) {
    console.error('Erro ao atualizar status:', err);
    return res.status(500).json({ message: 'Erro ao atualizar status', error: err.message });
  }
};
