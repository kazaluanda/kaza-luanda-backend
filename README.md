# 🏠 Kaza Luanda – Backend

Sistema completo de gerenciamento de residências para aluguel e venda, com suporte a agendamentos, autenticação com JWT e controle de papéis (cliente, gestor, admin).

---

## ✅ Pré-requisitos

- Node.js (v16+)
- MongoDB (Atlas ou local)
- Insomnia ou Postman para testes

---

## 📦 Instalação

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/kaza-luanda-backend.git
cd kaza-luanda-backend
```

---

## Rotas de Autenticação
- POST /api/auth/register
- POST /api/auth/login

## Rotas de Residências
- POST /api/residencias (auth)
- GET /api/residencias
- GET /api/residencias/:id
- GET /api/residencias/usuario/minhas (auth)
- PUT /api/residencias/:id (auth)
- DELETE /api/residencias/:id (auth)
