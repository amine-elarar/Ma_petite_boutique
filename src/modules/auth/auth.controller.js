const User = require('../users/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const register = async (request, response) => {
  try {
    const { name, email, password } = request.body;

    if (!name || !name.trim() || !email || !email.trim() || !password) {
      return response.status(400).json({ error: { message: "Tous les champs sont obligatoires." } });
    }

    if (typeof password !== 'string' || password.length < 8) {
      return response.status(400).json({ error: { message: "Le mot de passe doit contenir au moins 8 caractères." } });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const existEmail = await User.findOne({ email: normalizedEmail });
    if (existEmail) {
      return response.status(409).json({ error: { message: "Cet email est déjà utilisé." } });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      passwordHash,
      role: 'customer'
    });

    response.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    });
  } catch (error) {
    response.status(500).json({ error: { message: "Erreur serveur." } });
  }
};

const login = async (request, response) => {
  try {
    const { email, password } = request.body;

    if (!email || !password) {
      return response.status(400).json({ error: { message: "Email et mot de passe sont obligatoires." } });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return response.status(401).json({ error: { message: "Identifiants invalides." } });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return response.status(401).json({ error: { message: "Identifiants invalides." } });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    response.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    response.status(500).json({ error: { message: "Erreur serveur." } });
  }
};

module.exports = { register, login };
