const Agendamento = require('../models/Agendamento');

exports.criarAgendamento = async (req, res) => {
  const { residencia, data, mensagem } = req.body;

  try {
    const novoAgendamento = new Agendamento({
      usuario: req.usuario._id,
      residencia,
      data,
      mensagem
    });

    const salvo = await novoAgendamento.save();
    res.status(201).json(salvo);
  } catch (err) {
    res.status(500).json({ msg: 'Erro ao criar agendamento', erro: err.message });
  }
};

exports.listarMeusAgendamentos = async (req, res) => {
  try {
    const agendamentos = await Agendamento.find({ usuario: req.usuario._id })
      .populate('residencia');
    res.json(agendamentos);
  } catch (err) {
    res.status(500).json({ msg: 'Erro ao buscar seus agendamentos' });
  }
};

exports.listarTodos = async (req, res) => {
  try {
    const agendamentos = await Agendamento.find()
      .populate('usuario', 'nome email')
      .populate('residencia');
    res.json(agendamentos);
  } catch (err) {
    res.status(500).json({ msg: 'Erro ao buscar agendamentos' });
  }
};

exports.atualizarStatus = async (req, res) => {
  const { status } = req.body;
  const permitido = ['aprovado', 'rejeitado'];
  if (!permitido.includes(status)) return res.status(400).json({ msg: 'Status inválido' });

  try {
    const atualizado = await Agendamento.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(atualizado);
  } catch (err) {
    res.status(500).json({ msg: 'Erro ao atualizar status', erro: err.message });
  }
};
