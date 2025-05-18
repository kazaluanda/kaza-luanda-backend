const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  criarAgendamento,
  listarMeusAgendamentos,
  listarTodos,
  atualizarStatus
} = require('../controllers/agendamentoController');

// Usuário comum
router.post('/', auth, criarAgendamento);
router.get('/meus', auth, listarMeusAgendamentos);

// Gestor (rotas protegidas por função futuramente)
router.get('/', auth, listarTodos);
router.put('/:id/status', auth, atualizarStatus);

module.exports = router;
