// src/controllers/orderController.js
const { Order, Product, OrderProduct } = require('../models');

const STATUS_MAP = {
  "1": "em_preparo",
  "2": "pronto",
  "3": "entregue"
};

const VALID_STATUSES = ['ativo', 'em_preparo', 'pronto', 'entregue', 'cancelado'];

/**
 * Cria um novo pedido com seus itens
 */
exports.createOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { items } = req.body; // [{ productId, quantity, observacao }]

    // Validação básica dos itens
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Pedido vazio. Informe ao menos um item.' });
    }

    // Verificar se há produtos repetidos no pedido
    const productIdSet = new Set();
    for (const item of items) {
      if (!item.productId) {
        return res.status(400).json({ message: 'Cada item deve ter um productId válido.' });
      }
      if (productIdSet.has(item.productId)) {
        return res.status(400).json({ message: 'Produto duplicado no pedido.' });
      }
      productIdSet.add(item.productId);
    }

    // Buscar produtos válidos no banco
    const productIds = [...productIdSet];
    const foundProducts = await Product.findAll({ where: { id: productIds } });

    if (foundProducts.length !== productIds.length) {
      return res.status(400).json({ message: 'Um ou mais produtos não foram encontrados.' });
    }

    // Criar pedido
    const order = await Order.create({ userId, status: 'ativo' });

    // Preparar itens do pedido para inserção
    const orderItems = items.map(({ productId, quantity, observacao }) => ({
      orderId: order.id,
      productId,
      quantity: Number(quantity) > 0 ? Number(quantity) : 1,
      observation: observacao?.trim() || null
    }));

    // Inserir itens em bulk
    await OrderProduct.bulkCreate(orderItems);

    // Buscar pedido completo com produtos e atributos extras do relacionamento
    const createdOrder = await Order.findByPk(order.id, {
      include: [{
        model: Product,
        as: 'products',
        through: { attributes: ['quantity', 'observation'] }
      }]
    });

    return res.status(201).json(createdOrder);

  } catch (error) {
    console.error('Erro ao criar pedido:', error);
    return res.status(500).json({ message: 'Erro ao criar pedido', error: error.message });
  }
};

/**
 * Retorna todos os pedidos do usuário logado
 */
exports.getByUser = async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await Order.findAll({
      where: { userId },
      attributes: ['id', 'userId', 'status', 'createdAt', 'updatedAt'],
      include: [{
        model: Product,
        as: 'products',
        through: { attributes: ['quantity', 'observation'] }
      }]
    });

    return res.json(orders);

  } catch (error) {
    console.error('Erro ao buscar pedidos:', error);
    return res.status(500).json({ message: 'Erro ao buscar pedidos', error: error.message });
  }
};

/**
 * Retorna um pedido específico do usuário pelo ID
 */
exports.getById = async (req, res) => {
  try {
    const userId = req.user.id;
    const orderId = req.params.id;

    const order = await Order.findOne({
      where: { id: orderId, userId },
      include: [{
        model: Product,
        as: 'products',
        through: { attributes: ['quantity', 'observation'] }
      }]
    });

    if (!order) {
      return res.status(404).json({ message: 'Pedido não encontrado.' });
    }

    return res.json(order);

  } catch (error) {
    console.error('Erro ao buscar pedido:', error);
    return res.status(500).json({ message: 'Erro ao buscar pedido', error: error.message });
  }
};

/**
 * Cancela um pedido do usuário (status = 'cancelado')
 */
exports.cancelOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const orderId = req.params.id;

    const order = await Order.findOne({ where: { id: orderId, userId } });

    if (!order) {
      return res.status(404).json({ message: 'Pedido não encontrado.' });
    }

    if (order.status === 'cancelado') {
      return res.status(400).json({ message: 'Pedido já está cancelado.' });
    }

    order.status = 'cancelado';
    await order.save();

    return res.json({ message: 'Pedido cancelado com sucesso.' });

  } catch (error) {
    console.error('Erro ao cancelar pedido:', error);
    return res.status(500).json({ message: 'Erro ao cancelar pedido', error: error.message });
  }
};

/**
 * Atualiza o status de um pedido (com mapeamento simples de números para texto)
 */
exports.updateStatus = async (req, res) => {
  try {
    const userId = req.user.id;
    const orderId = req.params.id;
    let { status } = req.body;

    // Normaliza status: número -> texto
    if (STATUS_MAP[status]) {
      status = STATUS_MAP[status];
    }

    if (!VALID_STATUSES.includes(status)) {
      return res.status(400).json({ message: 'Status inválido.' });
    }

    const order = await Order.findOne({ where: { id: orderId, userId } });

    if (!order) {
      return res.status(404).json({ message: 'Pedido não encontrado.' });
    }

    if (order.status === 'cancelado') {
      return res.status(400).json({ message: 'Não é possível atualizar um pedido cancelado.' });
    }

    order.status = status;
    await order.save();

    return res.json(order);

  } catch (error) {
    console.error('Erro ao atualizar status:', error);
    return res.status(500).json({ message: 'Erro ao atualizar status', error: error.message });
  }
};
