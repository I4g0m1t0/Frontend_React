// src/controllers/categoryController.js
const { Category, Product } = require('../models');

exports.getAll = async (_req, res) => {
  const categories = await Category.findAll();
  res.json(categories);
};

exports.getById = async (req, res) => {
  const cat = await Category.findByPk(req.params.id);
  if (!cat) return res.status(404).json({ message: 'Categoria não encontrada' });
  res.json(cat);
};

exports.create = async (req, res) => {
  const { name } = req.body;
  const cat = await Category.create({ name });
  res.status(201).json(cat);
};

exports.update = async (req, res) => {
  const { name } = req.body;
  const cat = await Category.findByPk(req.params.id);
  if (!cat) return res.status(404).json({ message: 'Categoria não encontrada' });
  cat.name = name || cat.name;
  await cat.save();
  res.json(cat);
};

exports.delete = async (req, res) => {
  const cat = await Category.findByPk(req.params.id);
  if (!cat) return res.status(404).json({ message: 'Categoria não encontrada' });
  const count = await Product.count({ where: { categoryId: cat.id } });
  if (count > 0) {
    return res
      .status(409)
      .json({ message: 'Não é possível deletar: existem produtos vinculados' });
  }
  await cat.destroy();
  res.json({ message: 'Categoria deletada com sucesso' });
};
