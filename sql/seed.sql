PRAGMA foreign_keys = ON;

INSERT INTO users (id, name, email, password_hash, role) VALUES
  (1, 'Vendeur', 'seller@boutique.com', 'hash_seller', 'seller'),
  (2, 'Client 1', 'client1@boutique.com', 'hash_c1', 'customer'),
  (3, 'Client 2', 'client2@boutique.com', 'hash_c2', 'customer');

INSERT INTO products (id, name, description, price_cents, available) VALUES
  (1, 'Souris Gamer', 'Optique', 2500, 1),
  (2, 'Tapis de souris', 'XL', 1000, 1),
  (3, 'Écran 24 pouces', 'HD', 15000, 0);

INSERT INTO orders (id, customer_id, total_cents, status) VALUES
  (1, 2, 6000, 'new'),
  (2, 3, 2500, 'processed');

INSERT INTO order_items (order_id, product_id, product_name, quantity, unit_price_cents) VALUES
  (1, 1, 'Souris Gamer', 2, 2500),
  (1, 2, 'Tapis de souris', 1, 1000),
  (2, 1, 'Souris Gamer', 1, 2500);
