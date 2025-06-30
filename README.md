## CONSUMO DE API-REST-USUARIOS ##

Este proyecto es una aplicación MERN (MongoDB, Express, React, Node.js) que permite gestionar usuarios con operaciones **CRUD** y un sistema de **autenticación por token (JWT)**. 
Incluye un **frontend en React** con un diseño profesional y funcional.


## 🔧 Tecnologías utilizadas

### Backend:
- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- Docker (para base de datos)

### Frontend:
- React (Vite)
- CSS Modules (estilo moderno)
- Fetch API

## 🚀 Funcionalidades principales

### ✅ Backend (API RESTful)

| Método | Endpoint              | Descripción                      | Protección |
|--------|------------------------|----------------------------------|------------|
| POST   | `/api/users`           | Crear nuevo usuario              | 🔒 Token   |
| GET    | `/api/users`           | Listar todos los usuarios        | 🔒 Token   |
| GET    | `/api/users/:id`       | Obtener un usuario por ID        | 🔒 Token   |
| PUT    | `/api/users/:id`       | Actualizar usuario               | 🔒 Token   |
| DELETE | `/api/users/:id`       | Eliminar usuario                 | 🔒 Token   |
| POST   | `/api/login`           | Iniciar sesión y obtener token   | Pública    |

---

## 🖥️ Frontend (React)

- Formulario de login estilizado y validado
- Crear, editar y eliminar usuarios
- Tabla dinámica con acciones por usuario
- Feedback visual de errores y éxito
- Diseño limpio y moderno

## 📦 Instalación local
Clonar repositorio: https://github.com/Nicole352/api-rest-usuarios.git
### 🐳 Base de datos con Docker

Ejecuta el contenedor Mongo + mongo-express:

**docker-compose up -d**
MongoDB en localhost:27017
Mongo Express en http://localhost:8081

📁 Backend
# En el directorio raíz del proyecto
npm install
npm start
Servidor corriendo en: http://localhost:8080

💻 Frontend (React)
cd frontend
npm install
npm run dev
Aplicación visible en: http://localhost:3000

![image](https://github.com/user-attachments/assets/5d2f4440-bad4-41b2-8a70-43cd0eab813f)

![image](https://github.com/user-attachments/assets/cf7706c2-9e78-42ca-a7d7-3e8c53505eed)


Autora Nicole Jamilex Díaz Valdez GitHub: @Nicole352
