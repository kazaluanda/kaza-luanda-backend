// routes/residenciaRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const {
  criarResidencia,
  listarResidencias,
  detalharResidencia,
  minhasResidencias,
  atualizarResidencia,
  deletarResidencia
} = require('../controllers/residenciaController');

router.post('/', auth, upload.single('imagem'), criarResidencia);
router.get('/', listarResidencias);
router.get('/:id', detalharResidencia);
router.get('/usuario/minhas', auth, minhasResidencias);
router.put('/:id', auth, upload.single('imagem'), atualizarResidencia);
router.delete('/:id', auth, deletarResidencia);

module.exports = router;
