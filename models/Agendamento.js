const mongoose = require('mongoose');

const AgendamentoSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  residencia: { type: mongoose.Schema.Types.ObjectId, ref: 'Residencia', required: true },
  data: { type: Date, required: true },
  mensagem: { type: String },
  status: {
    type: String,
    enum: ['pendente', 'aprovado', 'rejeitado'],
    default: 'pendente'
  }
}, { timestamps: true });

module.exports = mongoose.model('Agendamento', AgendamentoSchema);
