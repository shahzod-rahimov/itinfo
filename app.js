const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const config = require("config");
const routes = require("./routes/index.routes");
const errorHandler = require("./middleware/ErrorHandlingMiddleware");
const exHbs = require("express-handlebars");
// const logger = require("./services/logger");

const {
  expressWinstonErrorLogger,
  expressWinstonLogger,
} = require("./middleware/loggerPolice");

const PORT = config.get("port") || 8080;
const app = express();

app.use(express.json()); // Front-enddan kelayotgan JSON so'rovlarni taniydi

app.use(cookieParser());
app.use(cors());

const hbs = exHbs.create({
  defaultLayout: "main",
  extname: "hbs",
});

// hbs.handlebars.registerHelper("ifEquals", function (arg1, arg2, options) {
//   return arg1 == arg2 ? options.fn(this) : options.inverse(this);
// });

app.engine("hbs", hbs.engine);

app.set("view engine", "hbs");
app.set("views", "views");
app.use(express.static("views"));
app.use(express.urlencoded({ extended: false })); // shuni surashim kerak


app.use(express.static("styles"));
app.use(express.static("images"));

app.use(expressWinstonLogger);

app.use(routes);

app.use(expressWinstonErrorLogger);

app.use(errorHandler);

async function start() {
  try {
    await mongoose.connect(config.get("dbUri"));
    app.listen(PORT, () => {
      console.log(`Server ${PORT}da ishga tushdi!`);
    });
  } catch (error) {
    console.log("Serverda Xatolik");
  }
}
start();
