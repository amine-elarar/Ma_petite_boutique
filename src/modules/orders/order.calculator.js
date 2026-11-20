const calculateOrderTotal = (items) => {
  if (!Array.isArray(items) || items.length < 1 || items.length > 10) {
    throw new Error("La commande doit contenir entre 1 et 10 lignes.");
  }

  let totalCents = 0;

  for (const item of items) {
    const quantity = item.quantity;
    const price = item.unitPriceCents !== undefined ? item.unitPriceCents : item.priceCents;

    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 10) {
      throw new Error("La quantité doit être un entier entre 1 et 10.");
    }

    if (!Number.isInteger(price) || price <= 0) {
      throw new Error("Le prix unitaire est invalide.");
    }

    totalCents += quantity * price;
  }

  return totalCents;
};

module.exports = { calculateOrderTotal };
