const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const permitidos = require('../middleware/roles');
const {
  criarAgendamento,
  listarMeusAgendamentos,
  listarTodos,
  atualizarStatus
} = require('../controllers/agendamentoController');

// Usuário comum
router.post('/', auth, criarAgendamento);
router.get('/meus', auth, listarMeusAgendamentos);

// Somente gestor ou admin pode ver e aprovar agendamentos
router.get('/', auth, permitidos('gestor', 'admin'), listarTodos);
router.put('/:id/status', auth, permitidos('gestor', 'admin'), atualizarStatus);

module.exports = router;
