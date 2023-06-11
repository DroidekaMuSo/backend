const { connect } = require("mongoose");

const { MONGO_URL } = require("../config/config");

const mongoDBconnection = async () => {
  try {
    await connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("=========================");
    console.log(`=====Mongo connected=====`);
    console.log("=========================");
  } catch (error) {
    console.log(
      "🚀 ~ file: mongo.config.js:9 ~ mongoDBconnection ~ error:",
      error
    );
  }
};

module.exports = { mongoDBconnection };
