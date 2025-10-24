# 📱 TrackIt

Aplicação React para acompanhamento de hábitos diários, desenvolvida com **Vite**, **styled-components**, **Context API** e **axios**, consumindo a API pública do [TrackIt](https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/).

---

## 🚀 Tecnologias

- React + Vite  
- React Router DOM  
- styled-components  
- Context API  
- axios  
- dayjs  
- react-loader-spinner  

---

## ⚙️ Funcionalidades

- Cadastro e login com persistência no **Local Storage**  
- Listagem e criação de hábitos  
- Marcar e desmarcar hábitos diários  
- Exibição de progresso  
- Layout mobile responsivo  

---

## 🔗 Endpoints Principais

| Ação | Método | Endpoint |
|------|---------|-----------|
| Cadastro | POST | `/auth/sign-up` |
| Login | POST | `/auth/login` |
| Criar hábito | POST | `/habits` |
| Listar hábitos | GET | `/habits` |
| Hábitos de hoje | GET | `/habits/today` |
| Marcar feito | POST | `/habits/:id/check` |
| Desmarcar feito | POST | `/habits/:id/uncheck` |

---

## 💾 Instalação

```bash
git clone https://github.com/seu-usuario/trackit.git
cd trackit
npm install
npm run dev

---

## 🌐 Deploy

Disponível em: https://track-it-seven-sand.vercel.app/
