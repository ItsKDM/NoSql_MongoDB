const path = require("path");

const express = require("express");
const app = express();
const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config();
const mongoConnect = require("./util/database").mongoConnect;
const bodyParser = require("body-parser");

const User = require("./models/user");

const errorController = require("./controllers/error");

app.use(cors());

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// app.use((req, res, next) => {});
app.use((req, res, next) => {
  User.findById(process.env.MONGO_ID).then((user) => {
    req.user = user;
    next();
  });
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoConnect(() => {
  app.listen(3000);
});

//mongodb+srv://khuranaraj121:<password>@cluster0.k8gajgr.mongodb.net/?retryWrites=true&w=majority