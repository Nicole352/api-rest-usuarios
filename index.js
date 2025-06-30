require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const userRoutes = require('./src/routes/userRoutes');

app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Conectado a MongoDB'))
  .catch((err) => console.error('❌ Error al conectar:', err));

// Rutas
app.use('/api', userRoutes);

app.get('/', (req, res) => {
  res.send('👤 API de Usuarios funcionando');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Servidor iniciado en puerto ${PORT}`);
});


// const express = require("express");
// const mongoose = require("mongoose");
// const Course = require("./src"); // Import the course model to ensure it's registered
// // Cadena de conexión con credenciales
// const connectionString =
//   "mongodb://admin:password123@localhost:27017/espe-mongoose?authSource=admin";
// // Utilizando async/await para conectar a MongoDB
// mongoose
//   .connect(connectionString)
//   .then(() => console.log("Conexión exitosa a MongoDB"))
//   .catch((error) => console.error("Error de conexión a MongoDB:", error));

// const app = express();

// app.get("/", (req, res) => {
//   res.send("Hello, World!");
// });

// app.post("/course", async (req, res) => {
//   Course.create({
//     title: "Curso LLALALA",
//     description: "Curso de Express para aprender Backend ",
//     numberOfTopics: 5,
//   })
//     .then((doc) => {
//       res.json(doc);
//     })
//     .catch((error) => {
//       console.log("Error al crear el curso:", error);
//       res.json(error);
//     });
// });

// app.get("/course", (req, res) => {
//   Course.find()
//     .then((courses) => {
//       res.json(courses);
//     })
//     .catch((error) => {
//       console.log("Error al obtener los cursos:", error);
//       res.json(error);
//     });
// });


// app.put("/course/:id", (req, res) => {
//   const id = req.params.id;
//   // 1. Actualizar multiples campos
//   Course.findByIdAndUpdate(
//     { _id: id },
//     { numberOfTopics: 20 },
//     { publishedAt: new Date() },
//     { new: true }
//   )
//     .then((course) => {
//       res.json(course);
//     })
//     .catch((error) => {
//       console.log("Error al actualizar el curso:", error);
//       res.json(error);
//     });
// });

// app.delete("/course/:id", (req, res) => {
//   // Eliminar registros multiples
//   const id = req.params.id;
//   // 1. Actualizar multiples campos
//   Course.findByIdAndDelete({ _id: id })
//     .then(() => {
//       res.json("Curso eliminado");
//     })
//     .catch((error) => {
//       console.log("Error al eliminar el curso:", error);
//       res.json(error);
//     });
// });

// app.listen(8080, () => console.log("Servidor iniciado"));
