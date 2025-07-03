// src/controllers/userController.js
const bcrypt = require('bcryptjs');
const jwt    = require('jsonwebtoken');
const { User } = require('../models');

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (await User.findOne({ where: { email } })) {
      return res.status(409).json({ message: 'Email já cadastrado' });
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await User.create({ name, email, password: hash });
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {expiresIn: '1d',});
    res.status(201).json({ id: user.id, name: user.name, email: user.email, token });
  } catch (err) {
    res.status(500).json({ message: 'Erro no servidor', error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }
    const payload = { id: user.id, email: user.email };
    // sem expiresIn, token básico
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Erro no servidor', error: err.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ['id','name','email']
    });
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Erro no servidor', error: err.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });
    user.name  = name  || user.name;
    user.email = email || user.email;
    await user.save();
    res.json({ id: user.id, name: user.name, email: user.email });
  } catch (err) {
    res.status(500).json({ message: 'Erro no servidor', error: err.message });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });
    if (!(await bcrypt.compare(oldPassword, user.password))) {
      return res.status(401).json({ message: 'Senha atual incorreta' });
    }
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();
    res.json({ message: 'Senha atualizada com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro no servidor', error: err.message });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });
    await user.destroy();
    res.json({ message: 'Conta deletada com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro no servidor', error: err.message });
  }
};
