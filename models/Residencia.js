// models/Residencia.js
const mongoose = require('mongoose');

const ResidenciaSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descricao: { type: String },
  preco: { type: Number, required: true },
  tipo: { type: String, enum: ['aluguel', 'venda'], required: true },
  endereco: { type: String, required: true },
  imagem: { type: String },
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Residencia', ResidenciaSchema);
