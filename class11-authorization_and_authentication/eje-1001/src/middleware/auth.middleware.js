const authMdw = (req, res, next) => {
  try {
    console.log(`Checking session:`, req.session);

    if (req.session?.user) {
      return next();
    }
  } catch (error) {
    console.log("🚀 ~ file: auth.middleware.js:5 ~ authMdw ~ error:", error);
  }
};

module.exports = authMdw;
