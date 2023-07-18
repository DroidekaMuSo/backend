const authMiddleware = (req, res, next) => {
  try {
    console.log(req.session);

    if (req.session?.user) {
      return next;
    }
  } catch (error) {
    console.log(
      "🚀 ~ file: auth.middleware.js:4 ~ authMiddleware ~ error:",
      error
    );
  }
};

module.exports = authMiddleware;
