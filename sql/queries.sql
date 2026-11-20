SELECT * FROM products WHERE available = 1;

SELECT * FROM orders WHERE customer_id = 2;

SELECT o.id AS order_id, o.status, p.id AS product_id, oi.product_name, oi.quantity, oi.unit_price_cents
FROM orders o
JOIN order_items oi ON o.id = oi.order_id
JOIN products p ON p.id = oi.product_id
WHERE o.id = 1;

SELECT order_id, SUM(quantity * unit_price_cents) AS total_cents
FROM order_items
WHERE order_id = 1
GROUP BY order_id;
