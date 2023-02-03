const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const errorMiddleware = require("./middlewares/error");

const app = express();

const corsOptions = {
  origin: true,
  credentials: true, //included credentials as true
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

//Route imports

app.get("/", (req, res) => {
  res.send({
    messge: "hello from app",
  });
});

//Route imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const bag = require("./routes/bagRoute");
const wishlist = require("./routes/wishlistRoute");
const order = require("./routes/orderRoute");

//Api endpoints
app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", bag);
app.use("/api/v1", wishlist);
app.use("/api/v1", order);

app.use(errorMiddleware);

module.exports = app;
