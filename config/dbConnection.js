const mongooes = require("mongoose");

const connectDb = async () => {
  try {
    const connect = await mongooes.connect(
      "mongodb://localhost:27017/ContactDb"
    );
    console.log("Connect db ");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDb;
