import express from "express";
import userRoute from "../routes/user.route";
import productRoute from "../routes/product.route";
import bodyParser from 'body-parser';

const app = express();


// define a route handler for the default home page
app.get("/", (req, res) => {
  res.send("Hello world!!!!!");
});

// start the Express server
app.listen(process.env.PORT, () => {
  console.log(`server started at http://localhost:${process.env.PORT}`);
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// Route
app.use('/user', userRoute);
app.use('/product', productRoute);