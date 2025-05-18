// routes/residenciaRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const {
  criarResidencia,
  listarResidencias,
  detalharResidencia,
  minhasResidencias
} = require('../controllers/residenciaController');

router.post('/', auth, upload.single('imagem'), criarResidencia);
router.get('/', listarResidencias);
router.get('/:id', detalharResidencia);
router.get('/usuario/minhas', auth, minhasResidencias);

module.exports = router;
