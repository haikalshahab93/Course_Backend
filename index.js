const express = require("express");
const dotenv = require("dotenv");
const authMiddleware = require("./middleware/authenticationMiddleware");
const authorizationMiddleware = require("./middleware/authorizationMiddleware");
const errorFormatter = require("./middleware/errorFormatter");
const applyMiddleware = require("./middleware/index");
const path = require("path");
const multer = require('multer');

const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const sliderRoutes = require("./routes/sliderRoutes");
const videoRoutes = require("./routes/videoRoutes");
const sliderdetailRoutes = require("./routes/sliderdetailRoutes");

const app = express();

dotenv.config();

const PORT = process.env.PORT;

app.use(express.json());
app.use("/slider/course", express.static(path.join(__dirname, "src/course")));
// app.use("/slider/photo", express.static(path.join(__dirname, "src/photo")));

app.get("/api", (req, res) => {
  res.send("Selamat datang di API HRH");
});

app.use("/auth", authRoutes)
app.use("/profile",authMiddleware,profileRoutes)
app.use("/slider",sliderRoutes)
app.use("/sliderdetail",sliderRoutes)
app.use("/video",videoRoutes)


if (PORT){
  app.listen(PORT, () => {
    console.log("Express API running in port: " + PORT);
  });
}
