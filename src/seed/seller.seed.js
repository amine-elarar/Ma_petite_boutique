require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Product = require('../modules/products/product.model.js');
const User = require('../modules/users/user.model.js');

const productsList = [
  { name: "Casque Bluetooth", description: "Sans fil", priceCents: 4500, available: true },
  { name: "Clavier Mécanique", description: "RGB", priceCents: 6500, available: true },
  { name: "Souris Gamer", description: "Optique", priceCents: 2500, available: true },
  { name: "Tapis de souris", description: "XL", priceCents: 1000, available: true },
  { name: "Écran 24 pouces", description: "Rupture de stock", priceCents: 15000, available: false }
];

const runSeed = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || process.env.URL_MONGO;
    await mongoose.connect(mongoUri);

    const sellerPassword = process.env.SELLER_PASSWORD || 'seller1234';
    const customerPassword = process.env.CUSTOMER_PASSWORD || 'client1234';

    const sellerHash = await bcrypt.hash(sellerPassword, 10);
    const customerHash = await bcrypt.hash(customerPassword, 10);

    await User.deleteMany({});
    await Product.deleteMany({});

    await User.insertMany([
      {
        name: "Vendeur Boutique",
        email: process.env.SELLER_EMAIL || "seller@boutique.com",
        passwordHash: sellerHash,
        role: "seller"
      },
      {
        name: "Client Un",
        email: "client1@boutique.com",
        passwordHash: customerHash,
        role: "customer"
      },
      {
        name: "Client Deux",
        email: "client2@boutique.com",
        passwordHash: customerHash,
        role: "customer"
      }
    ]);

    await Product.insertMany(productsList);

    console.log("Seed terminé avec succès");
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runSeed();
