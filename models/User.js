// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  papel: {
    type: String,
    enum: ['cliente', 'gestor', 'admin'],
    default: 'cliente'
  }
});

// Hash da senha antes de salvar
UserSchema.pre('save', async function (next) {
  if (!this.isModified('senha')) return next();
  const salt = await bcrypt.genSalt(10);
  this.senha = await bcrypt.hash(this.senha, salt);
  next();
});

// Método para comparar senhas
UserSchema.methods.compareSenha = async function (senha) {
  return await bcrypt.compare(senha, this.senha);
};

module.exports = mongoose.model('User', UserSchema);
