const mongoose = require('mongoose');
const Order = require('./order.model');
const Product = require('../products/product.model');
const { calculateOrderTotal } = require('./order.calculator');

const createOrder = async (req, res) => {
  try {
    const { items } = req.body;

    if (!Array.isArray(items) || items.length < 1 || items.length > 10) {
      return res.status(400).json({ error: { message: "La commande doit contenir entre 1 et 10 lignes." } });
    }

    const seenIds = new Set();

    for (const item of items) {
      if (!item || !item.productId || !mongoose.Types.ObjectId.isValid(item.productId)) {
        return res.status(400).json({ error: { message: "Identifiant produit invalide." } });
      }

      if (!Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > 10) {
        return res.status(400).json({ error: { message: "La quantité doit être un entier entre 1 et 10." } });
      }

      if (seenIds.has(item.productId)) {
        return res.status(400).json({ error: { message: "Les produits ne doivent pas se répéter dans la commande." } });
      }
      seenIds.add(item.productId);
    }

    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({ error: { message: "Le produit demandé est introuvable." } });
      }

      if (!product.available) {
        return res.status(409).json({ error: { message: "Un produit demandé est indisponible." } });
      }

      orderItems.push({
        product: product._id,
        name: product.name,
        quantity: item.quantity,
        unitPriceCents: product.priceCents
      });
    }

    const totalCents = calculateOrderTotal(orderItems);

    const newOrder = await Order.create({
      customer: req.user.id,
      items: orderItems,
      totalCents,
      status: 'new'
    });

    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ error: { message: error.message || "Erreur lors de la création de la commande." } });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ customer: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: { message: "Erreur serveur." } });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: { message: "Erreur serveur." } });
  }
};

const getOrderById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: { message: "Identifiant commande invalide." } });
    }

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ error: { message: "Commande introuvable." } });
    }

    if (req.user.role !== 'seller' && order.customer.toString() !== req.user.id) {
      return res.status(403).json({ error: { message: "Accès interdit à cette commande." } });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: { message: "Erreur serveur." } });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: { message: "Identifiant commande invalide." } });
    }

    if (req.body.status !== 'processed') {
      return res.status(400).json({ error: { message: "Transition de statut invalide. Seul 'processed' est autorisé." } });
    }

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ error: { message: "Commande introuvable." } });
    }

    order.status = 'processed';
    await order.save();

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: { message: "Erreur serveur." } });
  }
};

module.exports = { createOrder, getMyOrders, getAllOrders, getOrderById, updateOrderStatus };
