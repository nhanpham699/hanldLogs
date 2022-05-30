import mongoose from "mongoose";

mongoose
  .connect(process.env.URL_MONGODB)
  .then(() => console.log("mongoDB connected"))
  .catch((err: Error) => console.log("err: " + err));

module.exports = mongoose;
