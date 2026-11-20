const errorHandler = (err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: { message: "Corps JSON mal formé." } });
  }

  console.error(err);
  res.status(500).json({ error: { message: "Erreur interne du serveur." } });
};

module.exports = errorHandler;
