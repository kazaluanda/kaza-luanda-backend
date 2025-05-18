// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const {registrar, login} = require("../controllers/authController");

const {body, validationResult} = require("express-validator");

router.post(
  "/register",
  [
    body("nome").notEmpty().withMessage("Nome é obrigatório"),
    body("email").isEmail().withMessage("Email inválido"),
    body("senha")
      .isLength({min: 6})
      .withMessage("Senha deve ter no mínimo 6 caracteres"),
  ],
  (req, res, next) => {
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
      return res.status(400).json({erros: erros.array()});
    }
    next();
  },
  registrar
);

router.post("/login", login);

module.exports = router;
