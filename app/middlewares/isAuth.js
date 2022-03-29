module.exports = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.status(200);
  }
  next();
};
