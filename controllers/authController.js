// controllers/authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const gerarToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

exports.registrar = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    let usuario = await User.findOne({ email });
    if (usuario) return res.status(400).json({ msg: 'Usuário já existe' });

    usuario = new User({ nome, email, senha });
    await usuario.save();

    const token = gerarToken(usuario._id);
    res.status(201).json({ token, usuario: { id: usuario._id, nome: usuario.nome, email: usuario.email } });

  } catch (err) {
    res.status(500).json({ msg: 'Erro no servidor', erro: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await User.findOne({ email });
    if (!usuario) return res.status(400).json({ msg: 'Credenciais inválidas' });

    const isMatch = await usuario.compareSenha(senha);
    if (!isMatch) return res.status(400).json({ msg: 'Credenciais inválidas' });

    const token = gerarToken(usuario._id);
    res.json({ token, usuario: { id: usuario._id, nome: usuario.nome, email: usuario.email } });

  } catch (err) {
    res.status(500).json({ msg: 'Erro no servidor', erro: err.message });
  }
};
