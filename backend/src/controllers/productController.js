// src/controllers/productController.js
const { Product, OrderProduct } = require('../models');

exports.getAll = async (_req, res) => {
  const prods = await Product.findAll();
  res.json(prods);
};

exports.getById = async (req, res) => {
  const prod = await Product.findByPk(req.params.id);
  if (!prod) return res.status(404).json({ message: 'Produto não encontrado' });
  res.json(prod);
};

exports.create = async (req, res) => {
  const { name, price, categoryId } = req.body;
  const prod = await Product.create({ name, price, categoryId });
  res.status(201).json(prod);
};

exports.update = async (req, res) => {
  const { name, price, categoryId } = req.body;
  const prod = await Product.findByPk(req.params.id);
  if (!prod) return res.status(404).json({ message: 'Produto não encontrado' });
  prod.name       = name       || prod.name;
  prod.price      = price      || prod.price;
  prod.categoryId = categoryId || prod.categoryId;
  await prod.save();
  res.json(prod);
};

exports.delete = async (req, res) => {
  const prod = await Product.findByPk(req.params.id);
  if (!prod) return res.status(404).json({ message: 'Produto não encontrado' });
  const count = await OrderProduct.count({ where: { productId: prod.id } });
  if (count > 0) {
    return res
      .status(409)
      .json({ message: 'Não é possível deletar: produto em pedidos ativos' });
  }
  await prod.destroy();
  res.json({ message: 'Produto deletado com sucesso' });
};
