const express = require("express");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const authMiddleware = require("./middleware/authenticationMiddleware");
const authorizationMiddleware = require("./middleware/authorizationMiddleware");
const errorFormatter = require("./middleware/errorFormatter");
const applyMiddleware = require("./middleware/index");


const app = express();

dotenv.config();

const PORT = process.env.PORT;

app.use(express.json());

app.get("/api", (req, res) => {
  res.send("Selamat datang di API akuh");
});


// const productController = require("./src/product/product.controller");

// app.use("/products", productController);

app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log("Express API running in port: " + PORT);
});
