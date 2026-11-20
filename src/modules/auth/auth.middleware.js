const jwt = require('jsonwebtoken');

const authMiddleware = (request, response, next) => {
  const authHeader = request.header('Authorization');
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

  if (!token) {
    return response.status(401).json({ error: { message: "Token manquant." } });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    request.user = decoded;
    next();
  } catch (error) {
    return response.status(401).json({ error: { message: "Token invalide ou expiré." } });
  }
};

const isSeller = (request, response, next) => {
  if (request.user && request.user.role === 'seller') {
    return next();
  }
  return response.status(403).json({ error: { message: "Accès réservé au vendeur." } });
};

const isCustomer = (request, response, next) => {
  if (request.user && request.user.role === 'customer') {
    return next();
  }
  return response.status(403).json({ error: { message: "Accès réservé aux clients." } });
};

module.exports = { authMiddleware, isSeller, isCustomer };
