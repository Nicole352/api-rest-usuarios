const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Crear usuario con contraseña encriptada
exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Verificar si usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: 'Email ya registrado' });

    // Encriptar password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashedPassword });
    const saved = await user.save();
    res.status(201).json({ message: 'Usuario creado correctamente' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Login usuario
exports.loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({ error: 'Faltan datos' });
      }
  
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ error: 'Email o contraseña incorrectos' });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ error: 'Email o contraseña incorrectos' });
  
      const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
  
      res.json({ token }); // ✅ Este JSON debe ser devuelto
    } catch (err) {
      console.error("❌ Error en login:", err);
      res.status(500).json({ error: 'Error en servidor' });
    }
  };
  

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: 'ID inválido' });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json({ message: 'Usuario eliminado correctamente' });
  } catch (err) {
    res.status(400).json({ error: 'ID inválido' });
  }
};
