const { SECRET_JWT } = require("../utils/variables");

const authToken = (req = request, res = response, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "Not authenticated available",
      });
    }

    const token = authHeader.split(" ")[1];
    console.log(
      "🚀 ~ file: auth_token.middlware.js:12 ~ authToken ~ token:",
      token
    );

    const data = jwt.verify(token, SECRET_JWT);

    req.user = {
      name: data.user.name,
      lastName: data.user.lastName,
      email: data.user.email,
      age: data.user.age,
    };

    req.token = token;

    next();
  } catch (error) {
    console.log(
      "🚀 ~ file: auth_token.middlware.js:5 ~ authToken ~ error:",
      error
    );
  }
};

module.exports = authToken;
