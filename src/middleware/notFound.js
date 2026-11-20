const notFound = (req, res) => {
  res.status(404).json({ error: { message: "Route introuvable." } });
};

module.exports = notFound;
