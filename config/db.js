const mongoose = require("mongoose");

mongoose
  .connect("" + process.env.DB_USER, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("fail", err));
