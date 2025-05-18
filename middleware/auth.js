// middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token)
    return res.status(401).json({ msg: 'Acesso negado. Nenhum token fornecido.' });

  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
    req.usuario = await User.findById(decoded.id).select('-senha');
    next();
  } catch (err) {
    res.status(400).json({ msg: 'Token inválido' });
  }
};
