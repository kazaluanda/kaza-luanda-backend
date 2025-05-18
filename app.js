// app.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // para acessar imagens

// Conexão com MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB conectado"))
  .catch((err) => console.error("Erro ao conectar MongoDB:", err));

// Rotas
app.get("/", (req, res) => {
  res.send("API Kaza Luanda funcionando!");
});

// App.js (com trecho adicionado)
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// Mais alterações
const residenciaRoutes = require("./routes/residenciaRoutes");
app.use("/api/residencias", residenciaRoutes);

// Servir arquivos de imagem estaticamente
const path = require("path");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Porta
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
