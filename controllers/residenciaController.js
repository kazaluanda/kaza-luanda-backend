// controllers/residenciaController.js
const Residencia = require('../models/Residencia');

exports.criarResidencia = async (req, res) => {
  const { titulo, descricao, preco, tipo, endereco } = req.body;
  const imagem = req.file ? req.file.filename : null;

  try {
    const novaResidencia = new Residencia({
      titulo,
      descricao,
      preco,
      tipo,
      endereco,
      imagem,
      usuario: req.usuario._id
    });

    const salva = await novaResidencia.save();
    res.status(201).json(salva);
  } catch (err) {
    res.status(500).json({ msg: 'Erro ao salvar residência', erro: err.message });
  }
};

exports.listarResidencias = async (req, res) => {
  try {
    const residencias = await Residencia.find().populate('usuario', 'nome email');
    res.json(residencias);
  } catch (err) {
    res.status(500).json({ msg: 'Erro ao buscar residências' });
  }
};

exports.detalharResidencia = async (req, res) => {
  try {
    const residencia = await Residencia.findById(req.params.id).populate('usuario', 'nome email');
    if (!residencia) return res.status(404).json({ msg: 'Residência não encontrada' });
    res.json(residencia);
  } catch (err) {
    res.status(500).json({ msg: 'Erro ao buscar residência' });
  }
};

exports.minhasResidencias = async (req, res) => {
  try {
    const residencias = await Residencia.find({ usuario: req.usuario._id });
    res.json(residencias);
  } catch (err) {
    res.status(500).json({ msg: 'Erro ao buscar suas residências' });
  }
};
