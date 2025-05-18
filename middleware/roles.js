module.exports = function permitidos(...papeisPermitidos) {
  return (req, res, next) => {
    if (!req.usuario || !papeisPermitidos.includes(req.usuario.papel)) {
      return res.status(403).json({ msg: 'Acesso negado' });
    }
    next();
  };
};
