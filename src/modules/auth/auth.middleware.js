const jwt = require('jsonwebtoken');

const authMiddleware = (request, response, next) => {
    const authHeader = request.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return response.status(403).json({ error: { message: "Accès refusé. Token manquant." } });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        request.user = decoded;
        next();
    } catch (error) {
        return response.status(401).json({ error: { message: "Token invalide ou expiré." } });
    }
};

module.exports = authMiddleware;