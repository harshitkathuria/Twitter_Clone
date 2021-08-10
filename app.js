const express = require("express");
const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");
const tweetRoute = require("./routes/tweetRoute");
const connectionRoute = require("./routes/connectionRoute");
const messageRoute = require("./routes/messageRoute");
const conversationRoute = require("./routes/conversationRoute");

const app = express();

if (process.env.NODE_ENV == "development") {
  const morgan = require("morgan");
  app.use(morgan("dev"));
}

app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/tweets", tweetRoute);
app.use("/api/connect", connectionRoute);
app.use("/api/messages", messageRoute);
app.use("/api/conversations", conversationRoute);

app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: `Could not find ${req.url}`
  });
});

module.exports = app;
