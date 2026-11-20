const mongoose = require('mongoose');
const Product = require('./product.model.js');

const getProducts = async (request, response) => {
  try {
    const products = await Product.find();
    response.status(200).json(products);
  } catch (error) {
    response.status(500).json({ error: { message: "Erreur serveur." } });
  }
};

const getProductById = async (request, response) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(request.params.id)) {
      return response.status(400).json({ error: { message: "Identifiant produit invalide." } });
    }

    const product = await Product.findById(request.params.id);
    if (!product) {
      return response.status(404).json({ error: { message: "Le produit demandé est introuvable." } });
    }

    response.status(200).json(product);
  } catch (error) {
    response.status(500).json({ error: { message: "Erreur serveur." } });
  }
};

const createProducts = async (request, response) => {
  try {
    const { name, description, priceCents, available } = request.body;

    if (!name || typeof name !== 'string' || !name.trim()) {
      return response.status(400).json({ error: { message: "Le nom du produit est obligatoire." } });
    }

    if (!Number.isInteger(priceCents) || priceCents <= 0) {
      return response.status(400).json({ error: { message: "Le prix doit être un entier positif en centimes." } });
    }

    const newProduct = await Product.create({
      name: name.trim(),
      description: description ? String(description).trim() : '',
      priceCents,
      available: typeof available === 'boolean' ? available : true
    });

    response.status(201).json(newProduct);
  } catch (error) {
    response.status(400).json({ error: { message: "Données produit invalides." } });
  }
};

const updateProduct = async (request, response) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(request.params.id)) {
      return response.status(400).json({ error: { message: "Identifiant produit invalide." } });
    }

    const updates = {};

    if (request.body.name !== undefined) {
      if (typeof request.body.name !== 'string' || !request.body.name.trim()) {
        return response.status(400).json({ error: { message: "Le nom du produit est invalide." } });
      }
      updates.name = request.body.name.trim();
    }

    if (request.body.description !== undefined) {
      updates.description = String(request.body.description).trim();
    }

    if (request.body.priceCents !== undefined) {
      if (!Number.isInteger(request.body.priceCents) || request.body.priceCents <= 0) {
        return response.status(400).json({ error: { message: "Le prix doit être un entier positif en centimes." } });
      }
      updates.priceCents = request.body.priceCents;
    }

    if (request.body.available !== undefined) {
      if (typeof request.body.available !== 'boolean') {
        return response.status(400).json({ error: { message: "La disponibilité doit être un booléen." } });
      }
      updates.available = request.body.available;
    }

    const product = await Product.findByIdAndUpdate(request.params.id, updates, {
      new: true,
      runValidators: true
    });

    if (!product) {
      return response.status(404).json({ error: { message: "Le produit demandé est introuvable." } });
    }

    response.status(200).json(product);
  } catch (error) {
    response.status(400).json({ error: { message: "Données produit invalides." } });
  }
};

const deleteProduct = async (request, response) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(request.params.id)) {
      return response.status(400).json({ error: { message: "Identifiant produit invalide." } });
    }

    const product = await Product.findByIdAndDelete(request.params.id);
    if (!product) {
      return response.status(404).json({ error: { message: "Le produit demandé est introuvable." } });
    }

    response.status(200).json({ message: "Produit supprimé." });
  } catch (error) {
    response.status(500).json({ error: { message: "Erreur serveur." } });
  }
};

module.exports = { getProducts, createProducts, getProductById, updateProduct, deleteProduct };
